import React from "react";
import Skeleton from "react-loading-skeleton";

const PlaylistCardSkeleton = ({ cards }) =>
	Array(cards)
		.fill(0)
		.map((x, i) => (
			<div key={i} className="card-skeleton">
				<div className="title-skeleton">
					<Skeleton width={180} height={30} />
				</div>
				<div className="image-skeleton">
					<Skeleton width={120} height={120} borderRadius={10} />
				</div>
			</div>
		));

export default PlaylistCardSkeleton;
