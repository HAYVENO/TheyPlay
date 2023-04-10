const getPlaygroup = async (playlistId) => {
	try {
		const resp = await fetch(`/api/playgroups?playgroupId=${playlistId}`);
		const currentPlaygroup = await resp.json();
		console.log(currentPlaygroup);
		return currentPlaygroup;
	} catch (err) {
		console.log(err);
	}
};

export default getPlaygroup;
