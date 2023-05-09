import React from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../util/useSpotify";
import { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import PlaylistCategories from "./PlaylistCategories";
import { useRecoilState, waitForAll, waitForAllSettled, waitForAny } from "recoil";
import { openModalState, playgroupsState } from "../atoms/modalAtom";

const Center = () => {
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();

	//global states
	const [playgroups, setPlaygroups] = useRecoilState(playgroupsState);
	const [openModal, setOpenModal] = useRecoilState(openModalState);

	//local states
	const [playlists, setPlaylists] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	const [topTracks, setTopTracks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (spotifyApi.getAccessToken()) {
			try {
				console.log(playgroups);
				playgroups.length > 0 &&
					Promise.all([
						// fetch("/api/playgroups").then((response) => response.json()),

						spotifyApi.getUserPlaylists(),
						spotifyApi.getMyTopArtists(),
						spotifyApi.getMyTopTracks(),
					]).then(([playlistsData, topArtistsData, topTracksData]) => {
						console.log(playgroups);
						console.log(playlistsData?.body?.items);
						setPlaylists(playlistsData?.body?.items);
						setTopArtists(topArtistsData?.body?.items.slice(0, 10));
						setTopTracks(topTracksData?.body?.items.slice(0, 10));
						setIsLoading(false); // set isLoading to false after all the API calls are finished
					});
			} catch (err) {
				console.log("🚀 ~ file: center.jsx:39 ~ useEffect ~ err", err);
			}
		}
	}, [spotifyApi, session, playgroups]);

	useEffect(() => {
		if (session) {
			console.log(session);
			console.log(playgroups);
		}
	}, [session, playgroups]);

	const handleOpenModal = (e) => {
		setOpenModal(true);
	};

	return (
		<div className="center">
			<header className="center__heading">
				<button className="btn__add-song" onClick={handleOpenModal}>
					<CgPlayListAdd size={20} />
					<span>Add music</span>
				</button>
				{status === "authenticated" && !isLoading && (
					<div className="user__profile">
						<div className="profile__image">
							<FaUserCircle size={24} />
						</div>
						<span className="profile__name">{session.user.name}</span>
					</div>
				)}
			</header>
			{/* {PLAYLIST CATEGORIES  } */}
			<PlaylistCategories
				key={1}
				type="playgroup"
				loading={isLoading}
				category={playgroups}
				title="WHAT THEY PLAY"
			/>
			<PlaylistCategories
				key={2}
				type="playlist"
				loading={isLoading}
				category={playlists}
				title="YOUR PLAYLISTS"
			/>
			<PlaylistCategories
				key={3}
				type="playlist"
				loading={isLoading}
				category={topArtists}
				title="YOUR TOP ARTISTS"
			/>
			<PlaylistCategories
				key={4}
				type="track"
				loading={isLoading}
				category={topTracks}
				title="YOUR TOP TRACKS"
			/>
		</div>
	);
};

export default Center;
