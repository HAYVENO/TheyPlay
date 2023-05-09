import React from "react";

const PlaylistContributors = ({ theyTracks, playlistId, styles }) => {
	const contributors = [
		...new Set(
			theyTracks.filter((track) => track.playgroupId === playlistId).map((track) => track.userId)
		),
	];

	return (
		<>
			<p className={styles.playlistContributors}>
				<span className={styles.playlistContributorsNames}>
					{theyTracks.find((track) => track.playgroupId === playlistId)?.addedBy?.name}
				</span>{" "}
				and {contributors.length - 1} other contributor{contributors.length === 2 ? "" : "s"}.
			</p>
		</>
	);
};

export default PlaylistContributors;