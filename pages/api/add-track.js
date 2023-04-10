import { prisma } from "../../server/db/client";

const addSong = async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const entryData = req.body;
	console.log(entryData.song.preview_url);
	const existingSong = await prisma.song.findUnique({
		where: { id: entryData.song.id },
	});

	if (!existingSong) {
		try {
			//create new song object
			const createSong = await prisma.song.create({
				data: {
					name: entryData.song.name,
					id: entryData.song.id,
					popularity: entryData.song.popularity,
					artists: entryData.song.artists,
					previewUrl: entryData.song.preview_url,
				},
			});
			console.log(createSong);
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	}

	try {
		//check if the song has already been added to the playgroup
		const existingUserSong = await prisma.userSong.findFirst({
			where: {
				songId: entryData.song.id,
				playgroupId: entryData.playlist.id,
			},
		});

		if (existingUserSong)
			return res.status(400).json({
				message: "The song you selected is already in the Playgroup. Select another :)",
			});

		//create userSong object
		const createUserSong = await prisma.userSong.create({
			data: {
				songId: entryData.song.id,
				userId: entryData.user.username,
				playgroupId: entryData.playlist.id,
				songPopularity: entryData.song.popularity,
			},
		});
		// console.log("🚀 ~ file: add-track.js:36 ~ addSong ~ createUserSong:", createUserSong);
		res.json(createUserSong);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "You already added this song. Please add a new song" });
	}
};

export default addSong;
