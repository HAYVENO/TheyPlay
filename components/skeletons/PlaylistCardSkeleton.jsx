import React from "react";
import Skeleton from "react-loading-skeleton";

const PlaylistCardSkeleton = ({ cards }) =>
	Array(cards)
		.fill(0)
		.map((x, i) => (
			<div key={i} className="card-skeleton">
				<div className="image-skeleton">
					<Skeleton width={1000} height={110} />
				</div>
				<div className="title-skeleton">
					<Skeleton variant="h2" height={10} />
					<Skeleton variant="p" height={10} />
				</div>
			</div>
		));

export default PlaylistCardSkeleton;
