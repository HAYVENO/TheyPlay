import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
// import SongImagePlaceholder from "../../public/placeholder-playlist.jpg";
import Skeleton from "@mui/material/Skeleton";
import styles from "../../styles/playlistPage.module.css";
import { BsFillPlayCircleFill } from "react-icons/bs";
import classes from "classnames";
import Track from "../../components/Track";
import { useSession } from "next-auth/react";
import useSpotify from "../../util/useSpotify";

import { useRecoilState } from "recoil";
import {
	currentSongState,
	isCurrentTrackState,
	isPlayingState,
	tracksState,
	liveTrackState,
	volumeState,
	theyTracksState,
	isLikeState,
} from "../../atoms/trackAtom";
import getUserSongs from "../../util/getUserSongs";
import getPlaygroup from "../../util/getPlaygroups";
import getDominantColor from "../../util/getDominantColor";
import rgbToHue from "../../util/rgbToHue";
import PlaylistContributors from "../../components/util-components/playlistContributors";

const PlaylistPage = () => {
	const router = useRouter();

	//global states -
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
	const [isCurrentTrack, setIsCurrentTrack] = useRecoilState(isCurrentTrackState);
	const [tracks, setTracks] = useRecoilState(tracksState);
	const [liveTrack, setLiveTrack] = useRecoilState(liveTrackState);
	const [volume, setVolume] = useRecoilState(volumeState);
	const [theyTracks, setTheyTracks] = useRecoilState(theyTracksState);
	const [isLiked, setIsLiked] = useRecoilState(isLikeState);

	//local states -
	const { playlistId } = router.query;
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [currentPlaylist, setCurrentPlaylist] = useState("");
	const [themeColor, setThemeColor] = useState(null);
	const [contributors, setContributors] = useState("");

	useEffect(() => {
		//get theme color using Playgroup image's most dominant color
		const imageUrl = currentPlaylist?.groupImage
			? currentPlaylist.groupImage
			: "/placeholder-playlist.jpg";

		// async getDominantColor logic
		getDominantColor(imageUrl)
			.then((dominantColor) => {
				console.log(imageUrl);
				console.log(dominantColor);
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
				getPlaygroup(playlistId).then((currentPlaygroup) =>
					setCurrentPlaylist(currentPlaygroup)
				);

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
	}, [spotifyApi, session, playlistId, setTracks, setTheyTracks, isLiked]);

	const handleTrackPlay = (currentSongIndex) => {
		//check if the track's preview is available
		if (
			!tracks[currentSongIndex]?.preview_url &&
			!theyTracks[currentSongIndex]?.addedSong?.previewUrl
		) {
			console.log("Track's short not available");
			return;
		}

		setIsCurrentTrack(currentSongIndex);

		if (isPlaying) {
			currentSong.pause();
		}

		//create a new audio object with the track's /play - link/
		const audio = new Audio(
			tracks[currentSongIndex]?.preview_url ||
				theyTracks[currentSongIndex]?.addedSong?.previewUrl
		);
		console.log(theyTracks[currentSongIndex]?.addedSong?.previewUrl);
		console.log(theyTracks);
		audio.play();
		audio.volume = volume;
		audio.loop = true;
		setIsPlaying(true);
		setCurrentSong(audio);
		setIsCurrentTrack(currentSongIndex);
		setLiveTrack(tracks[currentSongIndex]);
	};

	console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ playlist", currentPlaylist);
	console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ tracks", tracks);
	console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ contributors", contributors);

	return (
		<>
			<Head>
				<title>Playgroups | TheyPlay Music</title>
			</Head>
			<main>
				<div
					style={{
						"--playlist-hue": themeColor,
						animation: isPlaying ? "hue-animation 20s infinite" : "none",
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
								{theyTracks.find((track) => track.playgroupId === playlistId)?.addedBy
									?.name ? (
									<PlaylistContributors
										theyTracks={theyTracks}
										playlistId={playlistId}
										styles={styles}
									/>
								) : (
									<Skeleton
										className="my__custom-skeleton"
										animation="wave"
										width={200}
										sx={{ bgcolor: " #9797978c" }}
									>
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
									<Skeleton
										className="my__custom-skeleton"
										animation="wave"
										sx={{ bgcolor: "#75757547" }}
										width={400}
									>
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
										sx={{ bgcolor: "#9696968c" }}
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
							<button className={classes(styles.playlistBtn, "btn")}>
								<BsFillPlayCircleFill
									color={`hsl(${themeColor}, 100%, 67.65%)`}
									size={58}
								/>
							</button>
						</div>
						<div className={styles.songListContainer}>
							<div className={classes(styles.listGrid, styles.listHead)}>
								<p>#</p>
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
