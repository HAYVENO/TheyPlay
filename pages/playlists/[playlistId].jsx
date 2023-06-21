import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
// import SongImagePlaceholder from "../../public/placeholder-playlist.jpg";
import Skeleton from "@mui/material/Skeleton";
import styles from "../../styles/playlistPage.module.css";
import { BsFillPlayCircleFill, BsSpotify } from "react-icons/bs";
import classes from "classnames";
import Track from "../../components/Track";
import { useSession } from "next-auth/react";
import useSpotify from "../../util/useSpotify";
import dayjs from "dayjs";

import { useRecoilState, useRecoilValue } from "recoil";
import {
	currentSongState,
	isCurrentTrackState,
	isPlayingState,
	tracksState,
	liveTrackState,
	volumeState,
	theyTracksState,
	isLikeState,
	currentSongNumberState,
	isOnRepeatState,
} from "../../atoms/trackAtom";
import getUserSongs from "../../util/getUserSongs";
import usePlaygroup from "../../hooks/usePlaygroup";
import getDominantColor from "../../util/getDominantColor";
import rgbToHue from "../../util/rgbToHue";
import PlaylistContributors from "../../components/util-components/playlistContributors";
import addPlaygroupToSpotify from "../../util/addPlaygroupToSpotify";
import createAddedPlaygroup from "../../util/createAddedPlaygroup";
import { openBackDropState, alertState } from "../../atoms/modalAtom";
import alertStyles from "../../util/alertStyles";
import { useQueryClient, useQuery } from "react-query";
import useUser from "../../hooks/useUser";
import updatePlaylistOnSpotify from "../../util/updatePlaygroupOnSpotify";

const { successStyle, errorStyle, warningStyle, infoStyle } = alertStyles;

const PlaylistPage = () => {
	// URL queries
	const router = useRouter();
	const { playlistId } = router.query;

	//global states -
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
	const [isCurrentTrack, setIsCurrentTrack] = useRecoilState(isCurrentTrackState);
	const [tracks, setTracks] = useRecoilState(tracksState);
	const [liveTrack, setLiveTrack] = useRecoilState(liveTrackState);
	const volume = useRecoilValue(volumeState);
	const [theyTracks, setTheyTracks] = useRecoilState(theyTracksState);
	const isLiked = useRecoilValue(isLikeState);
	const [openBackDrop, setOpenBackdrop] = useRecoilState(openBackDropState);
	const [currentSongNumber, setCurrentSongNumber] = useRecoilState(currentSongNumberState);
	const [alert, setAlert] = useRecoilState(alertState);
	const isOnRepeat = useRecoilValue(isOnRepeatState);

	//local states -
	const [currentPlaylist, setCurrentPlaylist] = useState("");
	const [themeColor, setThemeColor] = useState(null);
	const [contributors, setContributors] = useState("");
	const [livePlaygroup, setLivePlaygroup] = useState("");
	// const [currentSongNumber, setCurrentSongNumber] = useState(0);

	// Custom hooks
	const { data: session, status } = useSession();
	const currentPlaygroup = usePlaygroup(playlistId);
	const { data: currentUser, refetch: refetchUserData } = useUser(session?.user?.username);
	console.log(currentUser);
	const queryClient = useQueryClient();
	const spotifyApi = useSpotify();

	//get theme color using Playgroup image's most dominant color
	useEffect(() => {
		const imageUrl = currentPlaylist?.groupImage
			? currentPlaylist.groupImage
			: "/placeholder-playlist.jpg";

		// async getDominantColor logic
		getDominantColor(imageUrl)
			.then((dominantColor) => {
				return dominantColor;
			})
			.then((dominantColor) => rgbToHue(dominantColor))
			.then((hue) => {
				console.log(hue);
				setThemeColor(hue);
			})
			.catch((error) => {
				console.error(error);
			});
		//
	}, [currentPlaylist]);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			try {
				//get playgroup details
				if (currentPlaygroup) {
					setCurrentPlaylist(currentPlaygroup);
				}
				//get playgroup's userSong entries
				getUserSongs(playlistId)
					.then((retrievedUserSongs) => {
						console.log(retrievedUserSongs);
						setTheyTracks(retrievedUserSongs);
						return retrievedUserSongs;
					})
					.then((retrievedUserSongs) => retrievedUserSongs.map((entry) => entry.songId))
					.then((songIds) =>
						spotifyApi.getTracks(songIds).then((data) => {
							console.log(data?.body?.tracks);
							setTracks(data?.body?.tracks);
						})
					);
				setContributors([...new Set(theyTracks.map((track) => track.userId))]);
			} catch (err) {
				console.log(err);
			}
		}
	}, [spotifyApi, session, playlistId, setTracks, setTheyTracks, isLiked, currentPlaygroup]);

	// ON TRACK END EFFECT
	useEffect(() => {
		if (currentSongNumber >= tracks?.length) {
			currentSong?.pause();
			setIsPlaying(false);
			return;
		}

		if (currentSong)
			currentSong.onended = function () {
				console.log("Audio playback has ended");

				handleTrackPlay(currentSongNumber + 1);
				console.log(currentSongNumber);
			};

		console.log(
			"🚀 ~ file: [playlistId].jsx:137 ~ useEffect ~ currentSongNumber:",
			currentSongNumber
		);
	}, [currentSong, currentSongNumber]);

	// PLAY NEXT TRACK EFFECT
	useEffect(() => {
		if (currentSongNumber >= tracks?.length || currentSongNumber < 0) {
			setIsPlaying(false);

			return;
		}
		console.log("handle play skip");
		handleTrackPlay(currentSongNumber);
	}, [currentSongNumber]);

	const handleAllTracksPlay = () => {
		if (tracks?.length === 0) {
			console.log("No tracks available");
			return;
		}

		// Play the first track of the Playgroup (and go from there)
		handleTrackPlay(0);
	};

	// TODO: Handle next and Previous Play for when user leaves the current PlayGroup view
	const handleTrackPlay = (currentSongIndex) => {
		if (currentSongIndex >= tracks?.length) {
			console.log("way too long");
			return;
		}
		//check if the track's preview sound is available
		if (
			!tracks[currentSongIndex]?.preview_url &&
			!theyTracks[currentSongIndex]?.addedSong?.previewUrl
		) {
			setAlert({
				open: true,
				message: `${tracks[currentSongIndex]?.album?.name}'s audio is not available at this moment 😕`,
				severity: "warning",
				style: warningStyle,
			});

			currentSongIndex = currentSongIndex + 1;
		}

		if (isPlaying) {
			console.log(currentSong);
			currentSong.pause();
		}

		//create a new audio object with the track's /play - link/
		const audio = new Audio(
			tracks[currentSongIndex]?.preview_url ||
				theyTracks[currentSongIndex]?.addedSong?.previewUrl
		);
		console.log(theyTracks[currentSongIndex]?.addedSong?.previewUrl);
		console.log(tracks);
		audio.play();
		console.log(volume);
		audio.volume = ((volume + 0.1) * 0.7).toFixed(2);
		console.log(audio.volume);
		// I'm getting a UI bug at 0

		setIsPlaying(true);
		setCurrentSong(audio);
		setIsCurrentTrack(currentSongIndex);
		setLiveTrack(tracks[currentSongIndex]);
		setCurrentSongNumber(currentSongIndex);
	};

	console.log("currentUser --------", currentUser);

	//check if the user has already saved the Playgroup in the past

	const isAddedPlaygroup = useMemo(() => {
		console.log(
			currentUser?.addedPlaygroupsSpotify?.find(
				(addedPlaygroup) => addedPlaygroup?.playgroupId === currentPlaygroup?.id
			)
		);
		return currentUser?.addedPlaygroupsSpotify?.find(
			(addedPlaygroup) => addedPlaygroup?.playgroupId === currentPlaygroup?.id
		);
	}, [currentUser, currentPlaygroup]);

	// Rest of your component code...

	const handleAddToSpotify = async () => {
		try {
			setOpenBackdrop(true);

			// define the Playlist parameters
			const userId = currentUser?.id;
			const title = `${currentPlaylist?.name} - TheyPlay ✨`;
			const formattedDate = dayjs().format("MMMM D, YYYY h:mm A");
			const description = `Songs from the ${currentPlaylist?.name} Playgroup on TheyPlay Music app ✨. This list was last updated on ${formattedDate}.`;
			const playgroupTracksURIs = tracks.map((track) => track.uri);
			const imageUrl = currentPlaylist?.groupImage;

			//  UPDATE the Added Playgroup, not Add if the user already added the playgroup in the past.
			if (isAddedPlaygroup) {
				const { playlistId } = isAddedPlaygroup;
				console.log(playlistId);
				await updatePlaylistOnSpotify(
					playlistId,
					playgroupTracksURIs,
					spotifyApi,
					userId,
					description
				);

				setAlert({
					open: true,
					message: `${currentPlaylist.name} Playgroup is now up-to-date on your Spotify 🎉 `,
					severity: "success",
					style: successStyle,
				});
			} else {
				// function to add Playgroup to spotify then return the playlist ID
				const playlistId = await addPlaygroupToSpotify(
					title,
					description,
					playgroupTracksURIs,
					imageUrl,
					spotifyApi
				);

				// Record the Added Playgroup log to the backend𝌏
				const playgroupId = currentPlaylist?.id;
				const userId = session?.user?.username;
				const playgroupName = currentPlaylist?.name;
				await createAddedPlaygroup(playgroupId, userId, playlistId, playgroupName);

				//Refetch the Playgroup data
				refetchUserData();

				console.log(currentPlaylist);
				console.log(currentUser);

				//alert the user on success
				setAlert({
					open: true,
					message: `${currentPlaylist.name} Playgroup added to your Spotify successfully 🎉 `,
					severity: "success",
					style: successStyle,
				});
			}
		} catch (err) {
			console.log(err);
			setAlert({
				open: true,
				message: `Something went wrong somewhere. If this persists, please reach out ✉️`,
				severity: "error",
				style: errorStyle,
			});
		}
		setOpenBackdrop(false);
		console.log("playlist created, and recorded");
	};

	console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ tracks", tracks);
	console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ theyTracks", theyTracks);

	return (
		<>
			<Head>
				<title>Playgroups | TheyPlay Music</title>
			</Head>
			<main>
				<div
					style={{
						"--playlist-hue": themeColor,
						animation: isPlaying ? "hue-animation 40s infinite" : "none",
					}}
					className={styles.playlistContainer}
				>
					<div
						className={styles.playlistHead}
						style={{
							"--playlist-hue": themeColor,
						}}
					>
						<div className={styles.headContentContainer}>
							<div className={styles.playlistImageContainer}>
								{currentPlaylist.groupImage ? (
									<Image
										className={styles.playlistImage}
										width={200}
										height={200}
										src={currentPlaylist?.groupImage}
										priority
										alt="Playlist image"
									/>
								) : null}{" "}
							</div>

							<div className={styles.playlistDetails}>
								{theyTracks?.find((track) => track.playgroupId === playlistId)?.addedBy
									?.name ? (
									<PlaylistContributors
										theyTracks={theyTracks}
										playlistId={playlistId}
										styles={styles}
									/>
								) : (
									<Skeleton className="my__custom-skeleton" animation="wave" width={200}>
										<PlaylistContributors
											theyTracks={theyTracks}
											playlistId={playlistId}
											styles={styles}
										/>
									</Skeleton>
								)}

								{currentPlaylist?.name ? (
									<h1 className={styles.playlistName}>{currentPlaylist.name}</h1>
								) : (
									<Skeleton className="my__custom-skeleton" animation="wave" width={400}>
										<h1 className={styles.playlistName}></h1>
									</Skeleton>
								)}

								{tracks?.length && currentPlaylist?.description ? (
									<p className={styles.playlistDescription}>{`${
										tracks.length || " "
									} tracks • ${currentPlaylist?.description}`}</p>
								) : (
									<Skeleton
										className="my__custom-skeleton"
										animation="wave"
										width={300}
										height={20}
									/>
								)}
							</div>
						</div>
					</div>
					{/* Content section  */}
					<div className={styles.playlistContent}>
						<div className={styles.playlistControl}>
							<button
								onClick={handleAllTracksPlay}
								className={classes(styles.playlistPlayBtn, "btn")}
							>
								<BsFillPlayCircleFill
									color={`hsl(${themeColor}, 100%, 67.65%)`}
									size={60}
								/>
							</button>
							<button
								onClick={handleAddToSpotify}
								style={{
									border: `1px solid hsla(${themeColor}, 100%, 66%, 0.2)`,
									backgroundColor: `hsla(${themeColor}, 100%, 66%, 0.08)`,
								}}
								className={classes(styles.addToSpotifyBtn)}
							>
								<span>{isAddedPlaygroup ? "Update on Spotify" : "Add to Spotify"}</span>
								<BsSpotify size={18} />
							</button>
						</div>
						<div className={styles.songListContainer}>
							<div className={classes(styles.listGrid, styles.listHead)}>
								<p>S/N</p>
								<p>Title</p>
								<p>Added by</p>
								<p>Popularity</p>
								<p>Submitted</p>
							</div>
							<ul className={styles.songList}>
								{/* ... TRACK LIST ...  */}
								{tracks.map((track, index) => {
									return (
										<Track
											key={index}
											track={track}
											theyTrack={theyTracks[index]}
											index={index}
											onClick={handleTrackPlay}
											isCurrentTrack={isCurrentTrack}
										/>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default PlaylistPage;
