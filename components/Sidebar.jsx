import React, { useState, useEffect } from "react";
// import Image from "next/image";
import Link from "next/link";
import MyLogo from "../public/logo-test.svg";
import Skeleton from "@mui/material/Skeleton";
import { signOut, useSession } from "next-auth/react";
import { HiSearch } from "react-icons/hi";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { BiLibrary, BiLogOutCircle } from "react-icons/bi";
import { MdOutlineAddCircleOutline } from "react-icons/md";

// dynamic import for footer-preview-image
import dynamic from "next/dynamic";
const Image = dynamic(() => import("next/image"), { ssr: false });

import useSpotify from "../util/useSpotify";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPlayingState } from "../atoms/trackAtom";
import { openModalState, playgroupsState } from "../atoms/modalAtom";
import LinkPreview from "./util-components/LinkPreview";

const Sidebar = () => {
	const router = useRouter();
	const { playlistId } = router.query;

	//global states -
	const isPlaying = useRecoilValue(isPlayingState);
	const spotifyApi = useSpotify();
	const { data: session } = useSession();
	const [playlists, setPlaylists] = useState([]);
	const [openModal, setOpenModal] = useRecoilState(openModalState);
	const [playgroups, setPlaygroups] = useRecoilState(playgroupsState);

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
		// event.preventDefault();
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
						<RxDashboard size={24} />
						<span>Dashboard</span>
					</Link>
				</li>
				<li>
					<Link href="#" onClick={handleOpenModal}>
						<MdOutlineAddCircleOutline size={24} />

						<span>Add Song</span>
					</Link>
				</li>
				<li>
					<Link href="#">
						<BiLibrary size={24} />
						<span>Liked songs</span>
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
				{playgroups.length > 0
					? playgroups.map((playlist, i) => (
							<li key={playlist.id} className="sidebar__playlist">
								<Link
									className={playlist.id === playlistId ? "sidebar__playlist-active" : ""}
									style={{ fontWeight: playlist.id === playlistId ? "800" : "400" }}
									href={`/playlists/${playlist.id}`}
								>
									{playlist.name}
								</Link>
							</li>
					  ))
					: Array.from({ length: 7 }).map((_, i) => (
							<Skeleton
								key={i}
								variant="text"
								width={150}
								height={25}
								sx={{ bgcolor: "#7372725e" }}
							/>
					  ))}
			</ul>
			<div className="sidebar-footer">
				<p style={{ margin: 0 }}>
					Built by{" "}
					<a
						id="yusuf-copy"
						href="https://github.com/hayveno"
						target="_blank"
						rel="noopener noreferrer"
					>
						Yusuf Abdulhafeez
					</a>
					{playgroups?.length > 0 ? (
						<LinkPreview
							imageUrl="https://res.cloudinary.com/detye5zx5/image/upload/v1683667680/hayveno-github-profile_nxslwy.png"
							conf="sidebar-conf"
						/>
					) : (
						<Skeleton
							className="footer__image-preview "
							variant="rectangular"
							width={150}
							height={116}
						/>
					)}
				</p>
				<div className="line-3"></div>
				<div className="footer__socials-container">
					<a
						href="https://github.com/HAYVENO/TheyPlay"
						target="_blank"
						rel="noopener noreferrer"
					>
						<FaGithub size={16} style={{ cursor: "pointer" }} />
					</a>
					<a href="mailto:haythepen@gmail.com" target="_blank" rel="noopener noreferrer">
						<HiMail size={20} style={{ cursor: "pointer" }} />
					</a>
					<a href="https://twitter.com/hay_yusuf" target="_blank" rel="noopener noreferrer">
						<FaTwitter size={16} style={{ cursor: "pointer" }} />
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Sidebar;
