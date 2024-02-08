import { prisma } from "../../server/db/client";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		console.log("Make sure you use GET request");
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { playgroupId } = req.query;
	console.log(playgroupId);

	if (playgroupId) {
		try {
			//find the unique playgroup's data
			const playgroup = await prisma.playgroup.findUnique({
				where: {
					id: playgroupId,
				},
			});

			console.log(playgroup);
			res.status(200).json(playgroup);
		} catch (err) {
			console.log(err);
			res.status(500).json({ err });
		}
	} else {
		// if no playgroup specified, get all playgroups
		try {
			const playgroups = await prisma.playgroup.findMany({
				orderBy: {
					name: "desc",
				},
			});
			// console.log(playgroups);
			res.status(200).json(playgroups);
		} catch (err) {
			console.log(err);
			res.status(500).json({ err });
		}
	}
}
