const updatePlaylistOnSpotify = async (
	playlistId,
	playgroupTracksURIs,
	spotifyApi,
	userId,
	description
) => {
	try {
		// Step 1: Clear the existing tracks from the playlist
		await spotifyApi.replaceTracksInPlaylist(playlistId, []);

		// Step 2: Add the new tracks to the playlist
		await spotifyApi.addTracksToPlaylist(playlistId, playgroupTracksURIs);
		console.log("Updated playlist with new tracks successfully ✨");

		// Step 3: Update the playlist description
		await spotifyApi.changePlaylistDetails(playlistId, {
			description,
		});
		console.log("Updated playlist description successfully ✨");

		// Step 3: Update the lastUpdated field in the backend
		await fetch(
			`/api/added-playgroup-spotify?playlistId=${playlistId}&userId=${userId}&update=true`,
			{
				method: "PUT",
			}
		);
		console.log("Updated the last-updated field in the backend");
	} catch (err) {
		console.log("An error occurred:", err);
	}
};

export default updatePlaylistOnSpotify;
