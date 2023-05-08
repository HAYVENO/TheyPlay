import React from "react";
import Link from "next/link";
import Image from "next/image";
// import SongImagePlaceholder from "../public/placeholder-playlist.jpg";

const PlaylistCard = ({ playlist }) => {
	return (
		<li className="category__playlist" onClick={() => console.log("here is the id", playlist.id)}>
			<Link href={`/playlists/${playlist.id}`} className="category__playlist-link">
				<div className="playlist__card">
					<h3 className="playlist__title">{playlist.name}</h3>

					<Image
						width={120}
						height={120}
						src={playlist.images[0] ? playlist.images[0].url : "/placeholder-playlist.jpg"}
						className="playlist__image"
						alt={playlist.name}
						priority
					/>
				</div>
			</Link>
		</li>
	);
};

export default PlaylistCard;
