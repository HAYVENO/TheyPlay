// Assuming this code is within a React component or function
export default async function createAddedPlaygroup(playgroupId, userId, playlistId, playgroupName) {
	try {
		const response = await fetch("/api/added-playgroup-spotify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				playgroupId,
				userId,
				playlistId,
				playgroupName,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			console.log("AddedPlaygroupSpotify created:", data);
			// Handle success scenario here
		}
	} catch (error) {
		console.error("Failed to create AddedPlaygroupSpotify:", error);
	}
}

// Call the function to create the AddedPlaygroupSpotify record
