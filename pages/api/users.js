import { test } from "node:test";
import { prisma } from "../../server/db/client";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		console.log("Make sure you use GET request");
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { userId } = req.query;
	// console.log(userId);

	if (userId) {
		const testing = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		console.log("testing user ---", testing);
		try {
			// Find the unique user's data
			const user = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				include: {
					addedPlaygroupsSpotify: true,
				},
			});

			console.log("requested user----", user);
			res.status(200).json(user);
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Internal server error" });
		}
	} else {
		res.status(400).json({ message: "Invalid user ID" });
	}
}
