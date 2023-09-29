import { prisma } from "../../server/db/client";

// dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const addSong = async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	const entryData = req.body;
	console.log("🚀 ~ file: add-track.js:17 ~ addSong ~ entryData:", entryData);

	// check if the user has not passed the daily limit of the Playgroup
	const { dailyLimit: playgroupDailyLimit } =
		await prisma.playgroup.findUnique({
			where: {
				id: entryData.playlist.id,
			},
			select: {
				dailyLimit: true,
			},
		});

	console.log(playgroupDailyLimit);

	const serverTimeZone = "Africa/Lagos"; // using server's time
	const today = dayjs().tz(serverTimeZone).startOf("day").toDate();
	const tomorrow = dayjs(today).add(1, "day").toDate();

	// strict check if the user added the song /today/
	// ?? bug was here
	const userSongsAddedToPlaygroupToday = await prisma.userSong.count({
		where: {
			userId: entryData.user.username,
			playgroupId: entryData.playlist.id,
			addedAt: {
				gte: today,
				lt: tomorrow,
			},
		},
	});

	console.log(
		"🚀 ~ file: add-track.js:39 ~ addSong ~ userSongsAddedToday:",
		userSongsAddedToPlaygroupToday
	);
	console.log(
		"🚀 ~ file: add-track.js:41 ~ addSong ~ dailyLimit:",
		playgroupDailyLimit
	);

	//check to ensure songs the user added today are less than the P-dailyLimit
	if (userSongsAddedToPlaygroupToday >= playgroupDailyLimit) {
		const message = `You've reached the daily limit of this Playgroup — (${playgroupDailyLimit}). Please try again tomorrow.`;
		return res.status(429).json({ message });
	}

	// check if song exists in the database
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
				message:
					"Song already exists on this Playgroup — please choose a different song 😇",
			});

		//create userSong object
		const createUserSong = await prisma.userSong.create({
			data: {
				songName: entryData.song.name,
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
		const statusCode = err.status || 500; // Use the status property of the error object if available, otherwise default to 500
		res.status(statusCode).json({
			message: "Oops! Something went wrong 🙁. Please try again!",
		});
	}
};

export default addSong;
