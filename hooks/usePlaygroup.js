import { useQuery } from "react-query";

const usePlaygroup = (playlistId) => {
	const { data, error } = useQuery(["playgroup", playlistId], async () => {
		const resp = await fetch(`/api/playgroups?playgroupId=${playlistId}`);
		if (!resp.ok) {
			throw new Error("Failed to fetch playgroup");
		}
		const currentPlaygroup = await resp.json();
		return currentPlaygroup;
	});

	if (error) {
		console.log(error);
	}

	return data;
};

export default usePlaygroup;
