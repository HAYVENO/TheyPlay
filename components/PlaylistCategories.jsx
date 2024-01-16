import React from "react";
import PlaylistCard from "./PlaylistCard";
import TrackCard from "./TrackCard";
import PlaylistCardSkeleton from "./skeletons/PlaylistCardSkeleton";
import PlaygroupCard from "./PlaygroupCard";

const PlaylistCategories = ({ category, title, type, loading }) => {
	console.log(category);
	return (
		<div className="category">
			<div className="category__heading">
				<h2 className="category__title">{title}</h2>
			</div>

			<ul className={`category__${type}s`}>
				{/* PLAYLIST CARDS  */}
				{loading ? (
					<PlaylistCardSkeleton cards={5} />
				) : (
					category?.map((item) => {
						return (
							(type === "playgroup" && (
								<PlaygroupCard key={item.id} playlist={item} />
							)) ||
							(type === "playlist" && (
								<PlaylistCard key={item.id} playlist={item} />
							)) ||
							(type === "track" && (
								<TrackCard key={item.id} playlist={item} />
							))
						);
					})
				)}
			</ul>
			<hr className="line-2" />
		</div>
	);
};

export default PlaylistCategories;
