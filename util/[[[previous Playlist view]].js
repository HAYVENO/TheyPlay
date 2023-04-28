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
} from "../../atoms/trackAtom";

const PlaylistPage = () => {
	const router = useRouter();
	const { playlistId } = router.query;
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [currentPlaylist, setCurrentPlaylist] = useState("");

	//global states -
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
	const [isCurrentTrack, setIsCurrentTrack] = useRecoilState(isCurrentTrackState);
	const [tracks, setTracks] = useRecoilState(tracksState);
	const [liveTrack, setLiveTrack] = useRecoilState(liveTrackState);
	const [volume, setVolume] = useRecoilState(volumeState);

	async function getPlaygroupEntries(playgroupId) {
		const res = await fetch(`/api/user-songs?playgroupId=${playgroupId}`);
		const data = await res.json();
		return data;
	}

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			// try {
			// 	spotifyApi.getPlaylist(playlistId).then((data) => {
			// 		setTracks(data?.body.tracks.items);
			// 		setCurrentPlaylist(data?.body);
			// 	});
			// } catch (err) {
			// 	console.log("🚀 ~ file: center.jsx:39 ~ useEffect ~ err", err);
			// }

			try {
				//get playgroup entries
				getPlaygroupEntries(playlistId);
			} catch (err) {
				console.log(err);
			}
		}
	}, [spotifyApi, session, playlistId, setTracks]);

	const handleTrackPlay = (currentSongIndex) => {
		//check if the track's preview is available
		if (!tracks[currentSongIndex].track.preview_url) {
			console.log("Track's short not available");
			return;
		}

		setIsCurrentTrack(currentSongIndex);

		if (isPlaying) {
			currentSong.pause();
		}

		//create a new audio object with the track's /play - link/
		const audio = new Audio(tracks[currentSongIndex].track.preview_url);
		audio.play();
		audio.volume = volume;
		audio.loop = true;
		setIsPlaying(true);
		setCurrentSong(audio);
		setIsCurrentTrack(currentSongIndex);
		setLiveTrack(tracks[currentSongIndex].track);
	};

	// PROCESS ADD SONG IN THE BACKEND
	// async function addSong(contact) {
	// 	const response = await fetch("/api/contacts", {
	// 		method: "POST",
	// 		body: JSON.stringify(contact),
	// 	});

	// 	if (!response.ok) {
	// 		throw new Error(response.statusText);
	// 	}
	// 	return await response.json();
	// }

	// console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ playlist", currentPlaylist);
	// console.log("🚀 ~ file: [playlistId].jsx:23 ~ PlaylistPage ~ tracks", tracks);

	return (
		<>
			<Head>
				<title> Decide What They Play | theyPlay </title>
			</Head>
			<SkeletonTheme baseColor="#202020" highlightColor="#444">
				<div className="home-container">
					<Sidebar />
					<div className="center">
						{/* Playlist Head  */}
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
											currentPlaylist?.images
												? currentPlaylist?.images[0]?.url
												: SongImagePlaceholder
										}
										priority
										alt="Playlist image"
									/>

									<div className={styles.playlistDetails}>
										<p className={styles.playlistCategory}>By HAYVEN</p>
										<h1 className={styles.playlistName}>{currentPlaylist.name}</h1>
										<p className={styles.playlistDescription}>{`${
											currentPlaylist?.tracks?.total || ""
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
										<p>Duration</p>
									</div>
									<ul className={styles.songList}>
										{/* ... TRACK LIST ...  */}
										{tracks.map((track, index) => {
											return (
												<Track
													key={index}
													track={track}
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
					</div>
					<Player />
				</div>
			</SkeletonTheme>
		</>
	);
};

export default PlaylistPage;
