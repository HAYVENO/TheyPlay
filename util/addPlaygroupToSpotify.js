const addPlaygroupToSpotify = ({ title, description, playgroupTracksURIs }) => {
	spotifyApi
		.createPlaylist("My playlist", {
			description: "My description",
			public: true,
		})
		.then(function (playlistData) {
			const playlistId = playlistData.id;
			console.log("Created playlist!");

			const trackUris = [
				"spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
				"spotify:track:1301WleyT98MSxVHPZCA6M",
				// Add more track URIs here
			];

			return spotifyApi.addTracksToPlaylist(playlistId, trackUris);
		})
		.then(function () {
			console.log("Added tracks to playlist!");
		})
		.catch(function (err) {
			console.log("Something went wrong!", err);
		});
};

export default addPlaygroupToSpotify;
