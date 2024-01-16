import React from "react";
import Link from "next/link";
import Image from "next/image";

const PlaygroupCard = ({ playlist: playgroup }) => {
	return (
		<li
			className="category__playlist"
			onClick={() => console.log("here is the id", playgroup.id)}
		>
			<Link
				href={`/playgroups/${playgroup.id}`}
				className="category__playlist-link"
			>
				<div className="playgroup__card">
					<Image
						width={120}
						height={120}
						src={
							playgroup.groupImage
								? playgroup.groupImage
								: "/placeholder-playlist.jpg"
						}
						className="playgroup__image"
						alt={playgroup.name}
						priority
					/>
					<h3 className="playlist__title">{playgroup?.name} playgroup</h3>
					<h3 className="playlist__artists">{playgroup?.description}</h3>
				</div>
			</Link>
		</li>
	);
};

export default PlaygroupCard;
