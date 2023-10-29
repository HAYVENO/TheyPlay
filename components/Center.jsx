import React from "react";
import { useSession } from "next-auth/react";
import useSpotify from "../util/useSpotify";
import { useEffect, useState } from "react";
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
	BsPeople,
} from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import shuffle from "lodash/shuffle";
import getInitials from "../util/getInitials";
import PlaylistCategories from "./PlaylistCategories";
import {
	useRecoilState,
	waitForAll,
	waitForAllSettled,
	waitForAny,
} from "recoil";
import {
	openModalState,
	openChildModalState,
	playgroupsState,
} from "../atoms/modalAtom";
import { topTracksState } from "../atoms/trackAtom";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";
import Header from "./Header";

const Center = () => {
	const spotifyApi = useSpotify();

	const { data: session, status } = useSession();

	//global states
	const [playgroups, setPlaygroups] = useRecoilState(playgroupsState);
	const [openModal, setOpenModal] = useRecoilState(openModalState);
	const [openChildModal, setOpenChildModal] =
		useRecoilState(openChildModalState);
	const [topTracks, setTopTracks] = useRecoilState(topTracksState);

	//local states
	const [playlists, setPlaylists] = useState([]);
	const [topArtists, setTopArtists] = useState([]);
	// const [topTracks, setTopTracks] = useState([]);
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
						spotifyApi?.getMyTopTracks({ limit: 50 }),
					]).then(([playlistsData, topArtistsData, topTracksData]) => {
						console.log(playgroups);
						// shuffle the Suggested Top Tracks
						const shuffledTopTracks = shuffle(topTracksData?.body?.items);
						setTopTracks(shuffledTopTracks.slice(0, 20));
						setPlaylists(playlistsData?.body?.items);
						setTopArtists(topArtistsData?.body?.items.slice(0, 10));
						setIsLoading(false); // set isLoading to false after all the API calls are finished
					});
			} catch (err) {
				console.log("🚀 ~ file: center.jsx:39 ~ useEffect ~ err", err);
			}
		}
	}, [spotifyApi, session, setTopTracks, playgroups]);

	console.log(shuffle(topTracks));
	console.log(topArtists);

	useEffect(() => {
		if (session) {
			console.log(session);
			console.log(playgroups);
		}
	}, [session, playgroups]);

	const handleOpenModal = (e) => {
		setOpenModal(true);
	};

	console.log(openChildModal);

	return (
		<div className="center">
			<Header isLoading={isLoading} />

			{/* {PLAYLIST CATEGORIES  } */}
			<PlaylistCategories
				key={1}
				type="playgroup"
				loading={isLoading}
				category={playgroups}
				title="WHAT THEY PLAY"
			/>
			{/* Shuffle the Suggested Top Tracks for the Tracks category */}
			<PlaylistCategories
				key={4}
				type="track"
				loading={isLoading}
				category={topTracks}
				title="SUGGESTED TRACKS (FOR YOU)"
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
		</div>
	);
};

export default Center;
