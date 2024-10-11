import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/playlistPage.module.css";
// import reformatTime from "../lib/reformatTime";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import convertToFive from "../util/converter";
import { useRecoilValue } from "recoil";
import { liveTrackState, currentSongState } from "../atoms/trackAtom";

//dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import formatToSentence from "../util/formatToSentence";
import { MdEditNote, MdOutlineNotes } from "react-icons/md";
import { VscNote } from "react-icons/vsc";
import { FaCommentAlt, FaRegComment } from "react-icons/fa";
import { RiQuillPenFill } from "react-icons/ri";
dayjs.extend(relativeTime);

const Track = ({ track, theyTrack, index, onClick, isCurrentTrack }) => {
	//global states
	const liveTrack = useRecoilValue(liveTrackState);
	const currentSong = useRecoilValue(currentSongState);

	//local states
	const [currentIndex, setCurrentIndex] = useState();

	const handlePlay = () => {
		onClick(index);
		setCurrentIndex(index);
	};

	return (
		<li>
			<div
				// style={{ backgroundColor: isCurrentTrack === index ? "rgb(110 47 167 / 30%" : "" }}
				style={{
					backgroundColor:
						// (liveTrack.preview_url && liveTrack.preview_url === track.preview_url) ||
						// liveTrack.preview_url === theyTrack?.addedSong?.previewUrl

						currentSong?.src === track?.preview_url ||
						currentSong?.src === theyTrack?.addedSong?.previewUrl
							? "rgb(64 31 62)"
							: "",
				}}
				className={styles.listGrid}
				onClick={handlePlay}
			>
				<p className={styles.SN}>{index + 1}.</p>
				<div className={styles.songDetails}>
					<Image
						// style={{ opacity: track.preview_url ? "1" : "0.3" }}
						className={styles.songImage}
						width={38}
						height={38}
						src={track?.album?.images[1].url}
						alt="song"
					/>
					<div className={styles.songDescription}>
						<p
							style={{ textDecoration: "none", margin: "0" }}
							// href={track?.external_urls?.spotify}
							// target="_blank"
							// rel="noreferrer nofollow"
						>
							<p title="Listen on Spotify" className={styles.songTitle}>
								{track?.name}
							</p>
						</p>
						<p className={styles.songArtist}>
							{track?.artists &&
								formatToSentence(track?.artists, "name")}
						</p>
					</div>
					<div>
						<FaRegComment size={24} color="rgb(204 204 204)" />
						{/* <MdOutlineNotes size={28} /> */}
					</div>
				</div>
				<div className={styles.addedByBox}>
					<p>{theyTrack?.addedBy?.name?.split(" ")[0]}</p>
				</div>
				<div className={styles.ratingsContainer}>
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
				<p
					className={styles.submittedAtBox}
					style={{ fontStyle: "italic" }}
				>
					{" "}
					{dayjs(theyTrack?.addedAt).fromNow()}
				</p>
			</div>
		</li>
	);
};

export default Track;
