import React from "react";
import Link from "next/link";
import Image from "next/image";

let track;

const TrackCard = ({ playlist: track }) => {
	return (
		<li key={track?.id} className="category__playlist">
			<Link href={`#${track.id}`} className="category__playlist-link">
				<div className="playlist__card">
					<h3 className="playlist__title">{track.name}</h3>
					<Image
						className="playlist__image"
						width={150}
						height={150}
						alt={track.name}
						src={track?.album?.images[0]?.url}
						priority
					/>
				</div>
			</Link>
		</li>
	);
};

export default TrackCard;
