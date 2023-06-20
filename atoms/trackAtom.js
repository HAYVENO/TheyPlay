import { atom } from "recoil";

export const volumeState = atom({
	key: "volumeState",
	default: 0.03,
});

export const currentSongState = atom({
	key: "currentSongState", // unique ID (with respect to other atoms/selectors)
	default: null, // default value (aka initial value)
});

export const isPlayingState = atom({
	key: "isPlayingState",
	default: false,
});

export const isCurrentTrackState = atom({
	key: "isCurrentTrackState",
	default: null,
});

export const tracksState = atom({
	key: "tracksState",
	default: [],
});

export const liveTrackState = atom({
	key: "liveTrackState",
	default: {},
});

export const theyTracksState = atom({
	key: "theyTracksState",
	default: [],
});

export const topTracksState = atom({
	key: "topTracksState",
	default: [],
});

export const currentSongNumberState = atom({
	key: "currentSongNumberState",
	default: 0,
});

export const isLikeState = atom({
	key: "isLikeState",
	default: false,
});
