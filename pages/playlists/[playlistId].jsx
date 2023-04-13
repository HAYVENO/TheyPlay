import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/playlistPage.module.css";
import { BsFillPlayCircleFill } from "react-icons/bs";
import classes from "classnames";
import Track from "../../components/Track";
import { useSession } from "next-auth/react";
import useSpotify from "../../lib/useSpotify";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import SearchModal from "../../components/SearchModal";

import { SkeletonTheme } from "react-loading-skeleton";
import Player from "../../components/Player";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import Image from "next/image";
import SongImagePlaceholder from "../../public/placeholder-playlist.jpg";
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
import getUserSongs from "../../lib/getUserSongs";
import getPlaygroup from "../../lib/getPlaygroups";
import Layout from "../../components/Layout";

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
	console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ theyTracks", theyTracks);

	return (
		<>
			<Head>
				<title>Playgroups | TheyPlay Music</title>
			</Head>
			<main>
				<div
					style={{
						animation: isPlaying ? "hue-animation 20s infinite" : "none",
					}}
					className={styles.playlistContainer}
				>
					<div className={styles.playlistHead}>
						<div className={styles.headContentContainer}>
							<Image
								className={styles.playlistImage}
								width={200}
								height={200}
								src={
									currentPlaylist?.groupImage
										? currentPlaylist?.groupImage
										: SongImagePlaceholder
								}
								priority
								alt="Playlist image"
							/>

							<div className={styles.playlistDetails}>
								<p className={styles.playlistCategory}>By HAYVEN</p>
								<h1 className={styles.playlistName}>{currentPlaylist?.name}</h1>
								<p className={styles.playlistDescription}>{`${
									tracks.length || " "
								} tracks • ${currentPlaylist?.description || ""}`}</p>
							</div>
						</div>
					</div>
					{/* Content section  */}
					<div className={styles.playlistContent}>
						<div className={styles.playlistControl}>
							<button className={classes(styles.playlistBtn, "btn")}>
								{isPlaying ? (
									<UseAnimations
										animation={activity}
										size={31.5}
										fillColor="rgb(255 90 255)"
										strokeColor="rgb(255 90 255)"
										speed={0.5}
									/>
								) : (
									<BsFillPlayCircleFill color="rgb(255 90 255)" size={58} />
								)}
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
