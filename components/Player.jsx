import React from "react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import debounce from "lodash/debounce"; //3.4KB
// import SongImagePlaceholder from "../public/placeholder-playlist.jpg";
import {
	BsHeartFill,
	BsHeart,
	BsVolumeUpFill,
	BsPauseCircleFill,
	BsVolumeMuteFill,
	BsSkipStart,
	BsSpotify,
} from "react-icons/bs";
import { TbPlayerSkipBack, TbPlayerSkipForward } from "react-icons/tb";
import {
	BsFillPlayCircleFill,
	BsShuffle,
	BsVolumeDownFill,
	BsSkipEnd,
} from "react-icons/bs";
import { SlSocialSpotify } from "react-icons/sl";

import { TbRepeat, TbRepeatOnce } from "react-icons/tb";

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
	currentSongNumberState,
	isOnRepeatState,
} from "../atoms/trackAtom";
import Tooltip from "@mui/material/Tooltip";

import alertStyles from "../util/alertStyles";
import useSetCurrentSong from "../hooks/useSetCurrentSong";

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
	const [currentSongNumber, setCurrentSongNumber] = useRecoilState(
		currentSongNumberState
	);
	const [isOnRepeat, setIsOnRepeat] = useRecoilState(isOnRepeatState);

	//local states
	const [isLoadingLike, setIsLoadingLike] = useState(false);
	const playPauseButtonRef = useRef(null);

	// Handle Keypress
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (
				e.code === "Space" &&
				e.target.tagName !== "INPUT" &&
				e.target.tagName !== "TEXTAREA"
			) {
				e.preventDefault();
				playPauseButtonRef?.current.click();
				// something going on
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	// useEffect for every time a new song is mounted on the Player
	useEffect(() => {
		// write logic for checking if liked or not initially
		theyTracks &&
			setIsLiked(
				theyTracks[currentSongIndex]?.likes?.some(
					(like) => like.id === session.user.username
				)
			);

		// console.log(
		// 	theyTracks[currentSongIndex]?.likes?.some(
		// 		(like) => like.id === session.user.username
		// 	)
		// );
	}, [session, theyTracks, currentSongIndex, setIsLiked]);

	const debouncedHandleVolume = debounce((value) => {
		if (!currentSong) return;

		//set the volume - and convert the value from percentage to fraction
		currentSong.volume = value / 100;
		console.log(currentSong.volume);
		setVolume(currentSong.volume);
		console.log(currentSong.volume);
	}, 100);

	const handlePlayNext = () => {
		// Play next song logic
		setCurrentSongNumber((prevNumber) => prevNumber + 1);
		console.log(currentSongNumber);
	};

	const handlePlayPrevious = () => {
		// Play Previous song logic
		setCurrentSongNumber((prevNumber) => prevNumber - 1);
	};

	const handlePauseAndPlay = async () => {
		// console.log("current SONG", currentSong);
		// pause the current song, and vice-versa
		if (!currentSong) return;

		if (isPlaying) {
			await currentSong.pause();
			setIsPlaying(false);
			return;
		} else {
			await currentSong.play();
			setIsPlaying(true);

			return;
		}
	};

	const handleRepeat = () => {
		if (!currentSong) {
			return;
		}

		if (isOnRepeat) {
			currentSong.loop = false;
			setIsOnRepeat(false);
		} else {
			currentSong.loop = true;
			setIsOnRepeat(true);
		}
	};

	console.log(theyTracks);

	const handleLikeAndDislike = async () => {
		// console.log(theyTracks[currentSongIndex]?.likes);
		// console.log(
		// 	theyTracks[currentSongIndex]?.likes.some((like) => like.id === session.user.username)
		// );
		// console.log(theyTracks[currentSongIndex]?.id);

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
				throw new Error(
					"Something went wrong with the Like/Dislike. Please try again. "
				);
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

	console.log(liveTrack?.external_urls?.spotify);

	return (
		<div className="player">
			{/* Left */}
			<div
				// style={{
				// 	display: liveTrack?.external_urls?.spotify ? "block" : "none",
				// }}
				className="left-bar"
			>
				<div className="left-bar-container">
					<Image
						className="song-image"
						width={75}
						height={75}
						src={
							liveTrack?.album?.images[0]?.url ||
							"/placeholder-playlist.jpg"
						}
						priority
						alt="Song image"
					/>
					<div>
						<h3 style={{ color: "white", fontWeight: "700" }}>
							{liveTrack?.name ? liveTrack?.name : "Play a song ♫"}
						</h3>
						<p>
							{liveTrack?.artists &&
								liveTrack?.artists
									.map((artist) => artist?.name)
									.slice(0, 3)
									.join(", ")}
						</p>
					</div>
					<div className="player__cta-container">
						{/* like button */}
						<Tooltip arrow placement="top" title="Like (or unlike) song">
							<button
								style={{
									cursor:
										!liveTrack?.external_urls?.spotify ||
										isLoadingLike
											? "not-allowed"
											: "pointer",
									opacity:
										!liveTrack?.external_urls?.spotify ||
										isLoadingLike
											? "0.6"
											: "1",
								}}
								disabled={isLoadingLike ? true : false}
								className="btn"
								onClick={handleLikeAndDislike}
							>
								{isLiked ? (
									<BsHeartFill color="white" size={20} />
								) : (
									<BsHeart size={20} />
								)}
							</button>
						</Tooltip>
						{/* Play on Spotify button */}
						<Tooltip
							arrow
							placement="top"
							title="Play on Spotify (Full song)"
							sx={{ fontSize: "20px" }}
						>
							<a
								href={liveTrack?.external_urls?.spotify}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									opacity: liveTrack?.external_urls?.spotify
										? "1"
										: "0.6",
									cursor: liveTrack?.external_urls?.spotify
										? "pointer"
										: "not-allowed",
								}}
							>
								<button className="btn">
									<SlSocialSpotify color="white" size={20} />
								</button>
							</a>
						</Tooltip>
					</div>
				</div>
			</div>

			{/* Center */}
			<div className="player__center">
				<div className="player__controls-container">
					<div className="now__playing-controls">
						<button className="btn">
							<BsShuffle size={16} style={{ opacity: "0.6" }} />
						</button>
						<button onClick={handlePlayPrevious} className="btn">
							<BsSkipStart size={30} />
						</button>
						<button
							ref={playPauseButtonRef}
							className="btn"
							onClick={handlePauseAndPlay}
						>
							{isPlaying ? (
								<BsPauseCircleFill color="white" size={38} />
							) : (
								<BsFillPlayCircleFill color="white" size={38} />
							)}
						</button>
						<button onClick={handlePlayNext} className="btn">
							<BsSkipEnd size={30} />
						</button>
						<button
							onClick={handleRepeat}
							className="btn"
							style={{ opacity: currentSong ? "1" : "0.6" }}
						>
							{isOnRepeat ? (
								<TbRepeatOnce size={17} />
							) : (
								<TbRepeat size={17} />
							)}
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
						{volume < 0.01 ? (
							<BsVolumeMuteFill size={24} />
						) : (
							<BsVolumeDownFill size={24} />
						)}
					</button>
					<Box width={150}>
						{volume && (
							<Slider
								size="small"
								aria-label="track volume"
								defaultValue={0.3 * 100}
								valueLabelDisplay={volume < 0.2 ? "off" : "auto"}
								min={isPlaying ? 0.01 : 0} // I'm getting a UI bug at 0
								max={100}
								onChange={(e) => debouncedHandleVolume(e.target.value)}
								color="secondary"
							/>
						)}
					</Box>

					<button
						style={{ opacity: volume < 0.01 ? 0 : 1 }}
						className="btn"
					>
						{<BsVolumeUpFill size={24} />}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Player;
