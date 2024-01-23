import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	currentSongNumberState,
	currentSongState,
	isCurrentTrackState,
	isPlayingState,
	livePlaygroupState,
	liveTrackState,
	volumeState,
} from "../atoms/trackAtom";
import debounce from "lodash/debounce";
import { alertState } from "../atoms/modalAtom";
import alertStyles from "../util/alertStyles";

function useSetCurrentSong() {
	const { successStyle, errorStyle, warningStyle, infoStyle } = alertStyles;
	const currentSongNumber = useRecoilValue(currentSongNumberState);
	const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
	const livePlaygroup = useRecoilValue(livePlaygroupState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const volume = useRecoilValue(volumeState);
	const [liveTrack, setLiveTrack] = useRecoilState(liveTrackState);
	const [alert, setAlert] = useRecoilState(alertState);
	const [isCurrentTrack, setIsCurrentTrack] =
		useRecoilState(isCurrentTrackState);

	// TODO: Handle next and Previous Play for when user leaves the current PlayGroup view
	const handleTrackPlay = debounce(
		async (
			currentSongIndex,
			tracks = livePlaygroup?.liveTracks,
			theyTracks = livePlaygroup?.liveTheyTracks
		) => {
			console.log(liveTrack);
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

			//check if the track's preview sound is available //TODO: Alert bug proper fix
			if (
				theyTracks[currentSongIndex] &&
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

			console.log(audio);
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
			console.log(livePlaygroup.liveTracks);
			setIsPlaying(false);
		} else {
			console.log(livePlaygroup?.liveTracks);
			handleTrackPlay(currentSongNumber);
		}
	}, [currentSongNumber]);
}

export default useSetCurrentSong;
