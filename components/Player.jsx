import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import debounce from "lodash/debounce";
// import SongImagePlaceholder from "../public/placeholder-playlist.jpg";
import {
	BsHeartFill,
	BsHeart,
	BsVolumeUpFill,
	BsPauseCircleFill,
	BsVolumeMuteFill,
} from "react-icons/bs";
import { TbPlayerSkipBack, TbPlayerSkipForward } from "react-icons/tb";
import { BsFillPlayCircleFill, BsShuffle, BsArrowRepeat, BsVolumeDownFill } from "react-icons/bs";

import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { useRecoilState, useRecoilValue } from "recoil";
import { alertState } from "../atoms/modalAtom";
import {
	isPlayingState,
	currentSongState,
	isCurrentTrackState,
	theyTracksState,
	liveTrackState,
	volumeState,
	isLikeState,
} from "../atoms/trackAtom";

import alertStyles from "../lib/alertStyles";

const Player = () => {
	const { data: session } = useSession();
	const { warningStyle, infoStyle } = alertStyles;

	//global states -
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
	const liveTrack = useRecoilValue(liveTrackState);
	const [theyTracks, setTheyTracks] = useRecoilState(theyTracksState);
	const currentSongIndex = useRecoilValue(isCurrentTrackState);
	const [volume, setVolume] = useRecoilState(volumeState);
	const [alert, setAlert] = useRecoilState(alertState);
	const [isLiked, setIsLiked] = useRecoilState(isLikeState);

	//local states

	const [isLoadingLike, setIsLoadingLike] = useState(false);

	// useEffect for every time a new song is mounted on the Player
	useEffect(() => {
		// write logic for checking if liked or not initially
		setIsLiked(
			theyTracks[currentSongIndex]?.likes?.some((like) => like.id === session.user.username)
		);

		console.log(
			theyTracks[currentSongIndex]?.likes?.some((like) => like.id === session.user.username)
		);
	}, [session, theyTracks, currentSongIndex, setIsLiked]);

	const debouncedShowVolume = debounce((value) => {
		if (!currentSong) return;

		//set the volume - and convert the value from percentage to fraction
		currentSong.volume = value / 100;
		setVolume(value / 100);
		console.log(currentSong.volume);
	}, 50);

	const handlePauseAndPlay = () => {
		// console.log("current SONG", currentSong);
		// pause the current song, and vice-versa
		if (!currentSong) return;

		if (isPlaying) {
			currentSong.pause();
			setIsPlaying(false);
			return;
		} else {
			currentSong.play();
			setIsPlaying(true);

			return;
		}
	};

	console.log(theyTracks);

	const handleLikeAndDislike = async () => {
		console.log(theyTracks[currentSongIndex]?.likes);
		console.log(
			theyTracks[currentSongIndex]?.likes.some((like) => like.id === session.user.username)
		);
		console.log(theyTracks[currentSongIndex]?.id);

		// Check if the song is not already liked by the user - /db_persisted_like/ -- like if it's not liked yet
		const like = !theyTracks[currentSongIndex]?.likes?.some(
			(like) => like.id === session.user.username
		);
		console.log(like);

		// add user to the likes array
		const userSongId = theyTracks[currentSongIndex]?.id;
		console.log(userSongId);
		console.log(like);
		console.log(theyTracks[currentSongIndex]);

		//try setting the state both before and after

		setIsLoadingLike(true);

		try {
			const res = await fetch("/api/like-track", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userSongId: userSongId,
					userId: session.user.username,
					isLike: like ? "like" : "dislike",
				}),
			});

			if (res.ok) {
				const { message } = await res.json();
				console.log(message);
				if (!like) {
					setIsLiked(false);
					//pop up success alert
					setAlert({
						open: true,
						message,
						severity: "info",
						style: infoStyle,
						transition: "left",
						vertical: "top",
						horizontal: "right",
					});
				} else if (like) {
					setIsLiked(true);

					setAlert({
						open: true,
						message,
						severity: "info",
						style: infoStyle,
						transition: "left",
						vertical: "top",
						horizontal: "right",
					});
				}
				setIsLoadingLike(false);
			} else {
				throw new Error("Something went wrong with the Like/Dislike. Please try again. ");
			}
		} catch (error) {
			console.error(error);
			setAlert({
				open: true,
				message,
				severity: "error",
				style: errorStyle,
			});
		}
	};

	return (
		<div className="player">
			{/* Left */}
			<div className="left-bar">
				<div className="left-bar-container">
					<Image
						className="song-image"
						width={75}
						height={75}
						src={liveTrack?.album?.images[0]?.url || "/placeholder-playlist.jpg"}
						priority
						alt="Song image"
					/>
					<div>
						<h3 style={{ color: "white" }}>{liveTrack?.name}</h3>
						<p>
							{liveTrack.artists &&
								liveTrack?.artists
									.map((artist) => artist.name)
									.slice(0, 3)
									.join(", ")}
						</p>
					</div>
					<button
						style={{
							cursor: isLoadingLike ? "not-allowed" : "pointer",
							opacity: isLoadingLike ? "0.6" : "1",
						}}
						disabled={isLoadingLike ? true : false}
						className="btn"
						onClick={handleLikeAndDislike}
					>
						{isLiked ? <BsHeartFill color="white" size={18} /> : <BsHeart size={18} />}
					</button>
				</div>
			</div>

			{/* Center */}
			<div className="player__center">
				<div className="player__controls-container">
					<div className="now__playing-controls">
						<button className="btn">
							<BsShuffle size={16} />
						</button>
						<button className="btn">
							<TbPlayerSkipBack size={24} />
						</button>
						<button className="btn" onClick={handlePauseAndPlay}>
							{isPlaying ? (
								<BsPauseCircleFill color="white" size={38} />
							) : (
								<BsFillPlayCircleFill color="white" size={38} />
							)}
						</button>
						<button className="btn">
							<TbPlayerSkipForward size={24} />
						</button>
						<button className="btn">
							<BsArrowRepeat size={16} />
						</button>
					</div>
					{/* <div className="time__bar-container">
						<div id="timeBarContainer">
							<span className="songCurrentTime">0.00</span>
							<div id="timeBarRectangle">
								<div id="CurrentTimeBar"></div>
								<div id="timeBarCircle"></div>
							</div>
						</div>
					</div> */}
				</div>
			</div>

			{/* Right -- volume section */}
			<div className="player__right">
				<div className="volume-control-container">
					<button className="btn">
						{volume === 0 ? <BsVolumeMuteFill size={24} /> : <BsVolumeDownFill size={24} />}
					</button>
					<Box width={150}>
						<Slider
							size="small"
							aria-label="track volume"
							defaultValue={volume * 100}
							valueLabelDisplay="auto"
							min={0}
							max={100}
							onChange={(e) => debouncedShowVolume(e.target.value)}
							color="secondary"
						/>
					</Box>

					{/* <input
						type="range"
						min={0}
						max={100}
						id="volumeBar"
						onChange={(e) => debouncedShowVolume(e.target.value)}
						name="volume"
					/> */}

					<button style={{ opacity: volume === 0 ? 0 : 100 }} className="btn">
						{<BsVolumeUpFill size={24} />}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Player;
