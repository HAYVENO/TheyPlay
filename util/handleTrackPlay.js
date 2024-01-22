const playTrack = async (currentSongIndex, livePlaygroup) => {
	console.log(livePlaygroup);
	console.log(tracks);

	if (currentSongIndex >= tracks?.length) {
		console.log("way too long");
		await currentSong.pause();
		setIsPlaying(false);
		return;
	}

	if (isPlaying) {
		console.log(currentSong);
		await currentSong.pause();
	}

	// Check if the track's preview sound is available
	console.log(!tracks[currentSongIndex]?.preview_url);
	console.log(theyTracks[currentSongIndex]?.addedSong?.previewUrl);
	if (
		!tracks[currentSongIndex]?.preview_url &&
		!theyTracks[currentSongIndex]?.addedSong?.previewUrl
	) {
		setAlert({
			open: true,
			message: `${tracks[currentSongIndex]?.album?.name}'s audio is not available at this moment 😕`,
			severity: "warning",
			style: warningStyle,
		});

		currentSongIndex = currentSongIndex + 1;
	}

	// Create a new audio object with the track's /play - link/
	const audio = new Audio(
		tracks[currentSongIndex]?.preview_url ||
			theyTracks[currentSongIndex]?.addedSong?.previewUrl
	);

	console.log(tracks);
	await audio.play();

	audio.volume = ((volume + 0.1) * 0.7).toFixed(2); // UI issues at 0

	setIsPlaying(true);
	setCurrentSong(audio);
	setIsCurrentTrack(currentSongIndex);
	setLiveTrack(tracks[currentSongIndex]);

	console.log(livePlaygroup);
};

export default playTrack;
