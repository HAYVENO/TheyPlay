import { prisma } from "../../server/db/client";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const { userId, userSongId, isLike } = req.body;
	console.log(req.body);
	console.log(isLike === "like");
	if (isLike == "like") {
		try {
			// Add user to likes for userSong entry
			const updatedUserSongLikes = await prisma.userSong.update({
				where: {
					id: userSongId,
				},
				data: {
					likes: {
						connect: {
							id: userId,
						},
					},
				},
			});
			console.log(updatedUserSongLikes);
			return res.status(200).json({ message: "Song liked successfully 🌟" });
		} catch (err) {
			console.log(err);
		}
	} else if (isLike === "dislike") {
		try {
			// Remove user from likes for userSong entry
			const removedUserSongLike = await prisma.userSong.update({
				where: {
					id: userSongId,
				},
				data: {
					likes: {
						disconnect: {
							id: userId,
						},
					},
				},
			});
			console.log(removedUserSongLike);
			return res.status(200).json({ message: "Like removed successfully 🌟" });
		} catch (err) {
			console.log(err);
			res.status(400).json({
				message: "Something went wrong with your Like request — please try again.",
			});
		}
	}
	return;
}
