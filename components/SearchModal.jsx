import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import useSpotify from "../lib/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { openBackDropState, openModalState, playgroupsState, alertState } from "../atoms/modalAtom";
import { BsSearch, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { SlPlaylist } from "react-icons/sl";
import Image from "next/image";
import debounce from "lodash/debounce";
import convertToFive from "../lib/converter";
// import SongImagePlaceholder from "../public/placeholder-playlist.jpg";
import {
	currentSongState,
	isCurrentTrackState,
	isPlayingState,
	liveTrackState,
	volumeState,
} from "../atoms/trackAtom";

import alertStyles from "../lib/alertStyles";
const { successStyle, errorStyle, warningStyle, infoStyle } = alertStyles;

const style = {
	position: "absolute",
	top: "15%",
	left: "50%",
	transform: "translateX(-50%)",
	width: "35%",
};

const childStyle = {
	position: "absolute",
	top: "40%",
	left: "55%",
	transform: "translateX(-50%)",
	width: "35%",
};

const SearchModal = () => {
	const { data: session } = useSession();

	//global states
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
	const [isCurrentTrack, setIsCurrentTrack] = useRecoilState(isCurrentTrackState);
	const [liveTrack, setLiveTrack] = useRecoilState(liveTrackState);
	const [volume, setVolume] = useRecoilState(volumeState);
	const [openModal, setOpenModal] = useRecoilState(openModalState);
	const playGroups = useRecoilValue(playgroupsState);
	const [openBackDrop, setOpenBackdrop] = useRecoilState(openBackDropState);
	const [alert, setAlert] = useRecoilState(alertState);

	//local states
	const [searchedTracks, setSearchedTracks] = useState([]);
	const [openChildModal, setOpenChildModal] = useState(false);
	const [filteredPlayGroups, setFilteredPlayGroups] = useState([]);
	const [entryData, setEntryData] = useState({ song: {}, playlist: {}, user: {} });

	// CHILD MODAL OPEN-CLOSE HANDLER

	const handleCloseChildModal = () => setOpenChildModal(false);

	// PARENT MODAL OPEN-CLOSE HANDLER
	const handleClose = () => setOpenModal(false);
	const spotifyApi = useSpotify();

	const handleSearch = debounce((e) => {
		const searchValue = e.target.value;
		console.log(
			"🚀 ~ file: SearchModal.jsx:39 ~ handleSearch ~ searchValue",
			searchValue,
			isCurrentTrack
		);

		// control search
		if (spotifyApi.getAccessToken() && searchValue) {
			spotifyApi
				.searchTracks(searchValue)
				.then((data) => {
					setSearchedTracks(data?.body?.tracks?.items.slice(0, 4));
				})
				.catch((err) => console.log(err.message));
		}

		console.log("Searched tracks --", searchedTracks);
	}, 200);

	// Handle the opening the child modal and rendering of all /play-groups/
	const handleOpenChildModal = (index) => {
		setOpenChildModal(true);
		const hayvenId = "317stts2iim4xivtp4slychksqqa";

		console.log(playGroups);

		const addedTrack = searchedTracks[index];
		console.log("🚀 ~ file: SearchModal.jsx:104 ~ handleOpenChildModal ~ addedTrack", addedTrack);

		setEntryData((prevEntry) => ({ ...prevEntry, song: { ...addedTrack }, user: session.user }));
	};

	// when all parameters are submitted --

	// handle playlist search - filtering process -- onChange
	const handlePlaygroupSearch = debounce((e) => {
		const searchValue = e.target.value;
		console.log("🚀 ~ file: SearchModal.jsx:39 ~ handleSearch ~ searchValue", searchValue);

		const filteredList = playGroups.filter((group) =>
			group.name.toLowerCase().includes(searchValue.toLowerCase())
		);
		console.log(playGroups);
		console.log(filteredList);

		setFilteredPlayGroups(filteredList.slice(0, 2));
		//
		console.log("final result playgroups", filteredPlayGroups);
	}, 200);

	const handleEntrySubmission = (index) => {
		//FINAL - set the entry state and submit the entry to the server
		let addedPlaylist = filteredPlayGroups[index];
		console.log(
			"🚀 ~ file: SearchModal.jsx:135 ~ handleEntrySubmission ~ addedPlaylist:",
			addedPlaylist
		);

		// console.log("the added playlist", addedPlaylist);
		// Note - set state is an async process so it doesn't update immediately - A callback or useEffect will suffice
		setEntryData((prevEntry) => ({ ...prevEntry, playlist: addedPlaylist }));
		//submit song on the backend
	};

	const addTrackToPlaylist = useCallback(
		async (data) => {
			setOpenBackdrop(true);
			setTimeout(() => {
				setOpenModal(false);
				setOpenChildModal(false);
			}, 250);

			try {
				const response = await fetch("/api/add-track", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				const { message } = await response.json();

				console.log(response);

				//close loading spinner and modals
				setOpenBackdrop(false);

				console.log(response.message);

				if (response.status === 400) {
					throw new Error(message);
				}
				if (response.status === 429) {
					setAlert({
						open: true,
						message,
						severity: "warning",
						style: warningStyle,
					});
				}
				if (response.ok) {
					setAlert({
						open: true,
						message: "Congratulations! Song added successfully 🎉 ",
						severity: "success",
						style: successStyle,
					});
				}

				//setCloseBackdrop
				//setClose - Both - modals
			} catch (err) {
				console.log(err);

				//pop up error alert
				setAlert({
					open: true,
					message: err.message,
					severity: "error",
					style: errorStyle,
				});
			}
		},
		[setOpenBackdrop, setOpenModal, setAlert]
	);

	// The added track submission process
	useEffect(() => {
		if (
			entryData.playlist &&
			entryData.song &&
			Object.keys(entryData.playlist).length &&
			Object.keys(entryData.song).length
		) {
			addTrackToPlaylist(entryData);
			console.log(entryData);
			setEntryData({ song: {}, playlist: {}, user: session.user });
		}
	}, [entryData, session, addTrackToPlaylist]);

	// handler for searchedTrack play and Pause
	const handleTrackPlayAndPause = (currentSongIndex) => {
		if (isPlaying) {
			currentSong.pause();
		}

		if (!searchedTracks[currentSongIndex].preview_url) {
			console.log("Track's Short not available");
			return;
		}
		setIsCurrentTrack(currentSongIndex);

		//create a new audio object with the track's /play - link/
		const audio = new Audio(searchedTracks[currentSongIndex].preview_url);
		audio.play();
		audio.volume = volume;
		audio.loop = true;
		setIsPlaying(true);
		setCurrentSong(audio);
		setIsCurrentTrack(currentSongIndex);
		setLiveTrack(searchedTracks[currentSongIndex]);
	};

	return (
		<div>
			<Modal open={openModal} onClose={handleClose}>
				<div style={style}>
					<div className="search-modal">
						<div className="search-container">
							<div className="search-icon">
								<BsSearch size={25} color="#5090d3" />
							</div>
							<input
								className="search-field"
								name="song"
								placeholder="Step 1. Search for song…"
								maxLength="64"
								type="search"
								spellCheck={false}
								autoCorrect="off"
								autoComplete="off"
								onChange={handleSearch}
							></input>
						</div>
						<ul className="search-list">
							{searchedTracks.map((track, index) => {
								return (
									<li key={index}>
										<div className="track-container">
											<div
												className="track-details"
												onClick={() => handleTrackPlayAndPause(index)}
											>
												<div className="image-container">
													<Image
														style={{ opacity: track?.preview_url ? "1" : "0.5" }}
														className="track-image"
														width={35}
														height={35}
														src={
															track?.album.images[0].url ||
															"/placeholder-playlist.jpg"
														}
														alt="song"
													/>
													{/* Check if the current audio track has the same url as the /Current song/  */}
													{liveTrack.preview_url ===
														searchedTracks[index].preview_url && isPlaying ? (
														<BsFillPauseFill
															color="white"
															className="track__play-btn"
															size={24}
															style={{
																display: track?.preview_url ? "block" : "none",
															}}
														/>
													) : (
														<BsFillPlayFill
															color="white"
															className="track__play-btn"
															size={24}
															style={{
																display: track?.preview_url ? "block" : "none",
															}}
														/>
													)}
												</div>

												<div className="song-Description">
													<p
														style={{
															color: track?.preview_url ? "white" : "#ffffff69",
														}}
														className="track-name"
													>
														{track?.name.length > 33
															? `${track?.name.substring(0, 32)}...`
															: track?.name}
													</p>
													<p className="track-artist">
														{track?.artists
															.map((artist) => artist.name)
															.slice(0, 3)
															.join(", ")}
													</p>
													{/* ratings */}
													<Box>
														<Rating
															height={200}
															size="small"
															sx={{ color: "#d662ff", stroke: "#0000007a" }}
															precision={0.5}
															name="read-only"
															value={convertToFive(track?.popularity)}
															readOnly
														/>
													</Box>
												</div>
											</div>
											<p>
												<Button
													onClick={() => handleOpenChildModal(index)}
													sx={{ borderRadius: "6px", minWidth: "max-content" }}
													variant="outlined"
												>
													ADD TRACK
												</Button>
											</p>
											{/* CHILD MODAL */}
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</Modal>
			<Modal open={openChildModal} onClose={handleCloseChildModal}>
				<div style={childStyle}>
					<div className="child__search-modal">
						<div className="child__search-container">
							<div className="search-icon">
								<SlPlaylist size={25} color="#5090d3" />
							</div>
							<input
								style={{ fontSize: "1rem" }}
								className="search-field"
								name="playlist"
								placeholder="Step 2. Choose a Playgroup"
								maxLength="64"
								type="search"
								spellCheck={false}
								autoCorrect="off"
								autoComplete="off"
								onChange={handlePlaygroupSearch}
							></input>
						</div>
						<ul className="search-list">
							{filteredPlayGroups.length > 0 &&
								filteredPlayGroups.map((group, index) => {
									console.log(group);
									return (
										<li key={index}>
											<div
												className="track-container"
												// onClick={}
											>
												<div className="track-details">
													<div className="image-container">
														<Image
															className="track-image"
															width={35}
															height={35}
															src={group?.groupImage || SongImagePlaceholder}
															alt="song"
														/>
													</div>

													<div className="song-Description">
														<p className="track-name">
															{/* {track?.name.length > 33
																? `${track?.name.substring(0, 32)}...`
																: track?.name} */}
															{group?.name}
														</p>
														<p className="track-artist">N/A</p>
													</div>
												</div>
												<p>
													<Button
														onClick={() => handleEntrySubmission(index)}
														sx={{ borderRadius: "6px", minWidth: "max-content" }}
														variant="outlined"
														color="secondary"
													>
														SELECT
													</Button>
												</p>
												{/* CHILD MODAL */}
											</div>
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default SearchModal;
