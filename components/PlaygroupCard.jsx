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
				<div className="playlist__card">
					<h3 className="playlist__title">{playgroup.name}</h3>
					<Image
						width={120}
						height={120}
						src={
							playgroup.groupImage
								? playgroup.groupImage
								: "/placeholder-playlist.jpg"
						}
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
