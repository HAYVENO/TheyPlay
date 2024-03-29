import { prisma } from "../../server/db/client";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { playgroupId } = req.query;
	try {
		const userSongs = await prisma.userSong.findMany({
			where: {
				playgroupId,
			},
			include: {
				addedBy: {
					select: {
						name: true,
						rank: true,
					},
				},
				addedSong: {
					select: {
						previewUrl: true,
					},
				},
				likes: true,
			},
			orderBy: {
				addedAt: "desc",
			},
		});

		res.json(userSongs);
	} catch (err) {
		console.log(err);
		res.status(500).json({ err });
	}
}
