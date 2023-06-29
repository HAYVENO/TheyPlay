import getUserSongs from "./getUserSongs";

const fetchPlaygroupData = async (spotifyApi, playlistId) => {
	try {
		// Get playgroup's userSong entries
		const retrievedUserSongs = await getUserSongs(playlistId);

		// Get songIds from retrievedUserSongs
		const songIds = await retrievedUserSongs.map((entry) => entry.songId);

		// Get tracks using songIds
		if (songIds) {
			const tracksData = await spotifyApi.getTracks(songIds);
			console.log(
				"🚀 ~ file: getPlaygroupData.js:15 ~ fetchPlaygroupData ~ tracksData:",
				tracksData
			);
			const playgroupTracks = await tracksData.body.tracks;
			console.log(
				"🚀 ~ file: getPlaygroupData.js:20 ~ fetchPlaygroupData ~ playgroupTracks:",
				playgroupTracks
			);

			return { retrievedUserSongs, playgroupTracks };
		}
	} catch (error) {
		console.error("Error fetching playgroup data:", error);
		console.log("error ---", error);

		//  throw error; // Rethrow the error to be caught by the caller
	}
};

export default fetchPlaygroupData;
