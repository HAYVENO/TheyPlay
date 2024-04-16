import React, { useRef, useState } from "react";
import PlaylistCard from "./PlaylistCard";
import TrackCard from "./TrackCard";
import PlaylistCardSkeleton from "./skeletons/PlaylistCardSkeleton";
import PlaygroupCard from "./PlaygroupCard";
import { CgPlayListAdd } from "react-icons/cg";

const PlaylistCategories = ({ category, title, type, loading }) => {
	console.log(category);

	const categoryContainerRef = useRef(null);
	const [showAll, setShowAll] = useState(false);

	return (
		<div className="category">
			<div className="category__heading">
				<h2 className="category__title">{title}</h2>
			</div>

			<ul ref={categoryContainerRef} className={`category__${type}s`}>
				{/* PLAYLIST CARDS  */}
				{loading ? (
					<PlaylistCardSkeleton cards={3} />
				) : (
					<>
						{category?.map((item, index) => {
							let card = null;

							if (type === "playgroup") {
								card = (
									<PlaygroupCard
										key={item.id}
										playlist={item}
										showAll={false}
									/>
								);
							} else if (type === "playlist") {
								card = <PlaylistCard key={item.id} playlist={item} />;
							} else if (type === "track") {
								card = <TrackCard key={item.id} playlist={item} />;
							}

							// Only slice-3 on the PlAYGROUP cards based on the state of ShowAll
							if (type === "playgroup") {
								return card && showAll ? card : index < 3 && card;
							} else {
								return card && card;
							}
						})}
					</>
				)}
			</ul>
			{type === "playgroup" && !loading && (
				<div className="btn__show-more-container">
					<button
						className="btn__show-more"
						onClick={() => {
							setShowAll((prev) => !prev);
							!!categoryContainerRef.current &&
								categoryContainerRef.current.scrollIntoView();
						}}
					>
						<span>{!showAll ? "Show more" : "Show less"} </span>
					</button>
				</div>
			)}
			<hr className="line-2" />
		</div>
	);
};

export default PlaylistCategories;
