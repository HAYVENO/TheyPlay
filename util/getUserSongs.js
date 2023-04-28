// api.js

const getUserSongs = async (playlistId) => {
	try {
		const response = await fetch(`/api/user-songs?playgroupId=${playlistId}`);
		const playgroupEntries = await response.json();
		return playgroupEntries;
	} catch (err) {
		console.error(err);
	}
};

export default getUserSongs;
