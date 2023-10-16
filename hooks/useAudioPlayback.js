import { useEffect } from "react";
import { useRecoilValue, useRecoilState, useResetRecoilState } from "recoil";
import {
	currentSongNumberState,
	currentSongState,
	isPlayingState,
	livePlaygroupState,
} from "../atoms/trackAtom";
import debounce from "lodash/debounce";

// ON TRACK END
const useAudioPlayback = () => {
	// Use Recoil hooks to access global states
	const livePlaygroup = useRecoilValue(livePlaygroupState); // make it global
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
	const [currentSongNumber, setCurrentSongNumber] = useRecoilState(
		currentSongNumberState
	);

	// TODO: Handle next and Previous Play for when user leaves the current PlayGroup view
	const handleTrackPlay = debounce(
		async (
			currentSongIndex,
			tracks = livePlaygroup?.liveTracks,
			theyTracks = livePlaygroup?.liveTheyTracks
		) => {
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

			//check if the track's preview sound is available
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

			//create a new audio object with the track's /play - link/
			const audio = new Audio(
				tracks[currentSongIndex]?.preview_url ||
					theyTracks[currentSongIndex]?.addedSong?.previewUrl
			);

			console.log(tracks);
			await audio.play();

			audio.volume = ((volume + 0.1) * 0.7).toFixed(2); //UI issues at 0

			setIsPlaying(true);
			setCurrentSong(audio);
			setIsCurrentTrack(currentSongIndex);
			setLiveTrack(tracks[currentSongIndex]);

			console.log(livePlaygroup);
		},
		500 // debounce for .5s
	);

	useEffect(() => {
		if (currentSongNumber >= livePlaygroup?.liveTracks?.length) {
			// Pause audio and set isPlaying to false
			currentSong?.pause();
			setIsPlaying(false);
			return;
		}

		if (currentSong) {
			currentSong.onended = function () {
				console.log("Audio playback has ended");
				console.log(livePlaygroup);

				if (currentSongNumber >= livePlaygroup?.liveTracks?.length - 1) {
					// Pause audio and set isPlaying to false
					currentSong?.pause();
					setIsPlaying(false);
				}

				// Set the number to the next track so useEffect can handle it
				setCurrentSongNumber((prevNumber) => prevNumber + 1);
			};
		}

		console.log(
			"🚀 ~ file: [playlistId].jsx:137 ~ useEffect ~ currentSongNumber:",
			currentSongNumber
		);
	}, [currentSong, currentSongNumber]);
};

export default useAudioPlayback;
