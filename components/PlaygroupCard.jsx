import React from "react";
import Link from "next/link";
import Image from "next/image";
import SongImagePlaceholder from "../public/placeholder-playlist.jpg";

const PlaygroupCard = ({ playlist: playgroup }) => {
	return (
		<li
			className="category__playlist"
			onClick={() => console.log("here is the id", playgroup.id)}
		>
			<Link href={`/playlists/${playgroup.id}`} className="category__playlist-link">
				<div className="playlist__card">
					<h3 className="playlist__title">{playgroup.name}</h3>
					<Image
						width={130}
						height={130}
						src={playgroup.groupImage ? playgroup.groupImage : SongImagePlaceholder}
						className="playlist__image"
						alt={playgroup.name}
						priority
					/>
				</div>
			</Link>
		</li>
	);
};

export default PlaygroupCard;
