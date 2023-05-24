const addPlaygroupToSpotify = async (
	title,
	description,
	playgroupTracksURIs,
	imageUrl,
	spotifyApi
) => {
	try {
		// Step 1: Create the playlist
		const playlistData = await spotifyApi.createPlaylist(title, {
			description: description,
			public: true,
		});
		const playlistId = playlistData.body.id;
		console.log(playlistData);

		// Step 2: Add tracks to the playlist
		await spotifyApi.addTracksToPlaylist(playlistId, playgroupTracksURIs);
		console.log("Added tracks to playlist successfully ✨");

		// Step 3: Upload the playlist cover image IF there's a Playgroup Image ???

		return playlistId;
	} catch (err) {
		console.log("An error occurred:", err);
	}
};

export default addPlaygroupToSpotify;
