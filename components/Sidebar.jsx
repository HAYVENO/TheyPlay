import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MyLogo from "../public/logo-test.svg";
import { signOut, useSession } from "next-auth/react";
import { HiHome, HiSearch } from "react-icons/hi";
import { BiLibrary, BiLogOutCircle } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import useSpotify from "../lib/useSpotify";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPlayingState } from "../atoms/trackAtom";
import { openModalState, playgroupsState } from "../atoms/modalAtom";

const Sidebar = () => {
	//global states -
	const isPlaying = useRecoilValue(isPlayingState);

	const router = useRouter();
	const { playlistId } = router.query;

	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [playlists, setPlaylists] = useState([]);
	const [openModal, setOpenModal] = useRecoilState(openModalState);
	const [playgroups, setPlaygroups] = useRecoilState(playgroupsState);

	// useEffect(() => {
	// get user playlists from Spotify
	// 	if (spotifyApi.getAccessToken()) {
	// 		spotifyApi.getUserPlaylists().then((data) => {
	// 			setPlaylists(data?.body?.items);
	// 		});
	// 	}
	// }, [spotifyApi, session]);

	useEffect(() => {
		try {
			fetch("/api/playgroups")
				.then((response) => response.json())
				.then((playgroups) => {
					console.log(playgroups);
					setPlaygroups(playgroups);
				});

			// setPlaylists(playgroupsData);
		} catch (err) {
			console.log(err);
		}
	}, [setPlaygroups]);

	// console.log(playlists);
	// console.log("the query one", playlistId);

	const handleOpenModal = (e) => {
		event.preventDefault();
		setOpenModal(true);
	};

	return (
		<nav
			style={{ animation: isPlaying ? "hue-animation 10s infinite" : "none" }}
			className="sidebar"
		>
			<div className="logo-box">
				<Image width={131} height={40} src={MyLogo} alt="logo image" />
			</div>
			<ul className="sidebar-nav">
				<li>
					<Link href="/">
						<HiHome size={24} />
						<span>Home</span>
					</Link>
				</li>
				<li>
					<Link href="#" onClick={handleOpenModal}>
						<MdAdd size={25} />

						<span>Add Song</span>
					</Link>
				</li>
				<li>
					<Link href="#">
						<BiLibrary size={24} />
						<span>My Library</span>
					</Link>
				</li>
				<li onClick={() => signOut()}>
					<Link href="">
						<BiLogOutCircle size={24} />
						<span>Sign out</span>
					</Link>
				</li>
			</ul>
			<hr className="line" />
			{/* side bar playlists  */}
			<ul className="sidebar__playlists">
				{playgroups.map((playlist, i) => (
					<li key={playlist.id} className="sidebar__playlist">
						<Link
							className={playlist.id === playlistId ? "sidebar__playlist-active" : ""}
							style={{ color: playlist.id === playlistId ? "white" : "" }}
							href={`/playlists/${playlist.id}`}
						>
							{playlist.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Sidebar;
