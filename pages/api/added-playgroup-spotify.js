import { prisma } from "../../server/db/client";

export default async function handler(req, res) {
	if (req.method !== "POST" && req.method !== "PUT") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	console.log(req.body);
	const { playgroupId, userId, playlistId, playgroupName } = req.body;

	if (req.method === "PUT") {
		const { playlistId, userId } = req.query;
		console.log(userId);

		// if (!playlistId && !userId) {
		// 	return res.status(400).json({ message: "Missing playlistId or userId." });
		// }

		try {
			// Update the lastUpdated field of the addedPlaygroups
			const updatedPlaygroup = await prisma.addedPlaygroupSpotify.update({
				where: { playlistId, userId },
				data: { lastUpdate: new Date() },
			});

			console.log(updatedPlaygroup);
			res.status(200).json(updatedPlaygroup);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		}
	}

	try {
		const addedPlaygroupSpotify = await prisma.addedPlaygroupSpotify.create({
			data: {
				playlistId,
				playgroupId,
				userId,
				playgroupName,
			},
		});

		res.status(201).json({ addedPlaygroupSpotify });
	} catch (error) {
		console.log("Failed to create AddedPlaygroupSpotify:", error);
		res.status(500).json({ message: "Failed to create AddedPlaygroupSpotify" });
	}
}
