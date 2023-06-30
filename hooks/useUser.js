import { useQuery } from "@tanstack/react-query";

const useUser = (userId) => {
	const { data, error, refetch } = useQuery(["user", userId], async () => {
		const resp = await fetch(`/api/users?userId=${userId}`);
		if (!resp.ok) {
			throw new Error("Failed to fetch user");
		}
		const userData = await resp.json();
		console.log(userData);
		return userData;
	});

	if (error) {
		console.log(error);
	}

	console.log(data);

	return { data, error, refetch };
};

export default useUser;
