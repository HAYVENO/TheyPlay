import { atom } from "recoil";

export const openModalState = atom({
	key: "openModalState",
	default: false,
});

export const openChildModalState = atom({
	key: "openChildModalState",
	default: false,
});

export const playgroupsState = atom({
	key: "playgroupsState",
	default: [],
});

export const openBackDropState = atom({
	key: "openBackDropState",
	default: false,
});

export const alertState = atom({
	key: "alertState",
	default: {
		open: false,
		message: "",
		severity: "info",
		style: null,
		transition: "left",
		vertical: "top",
		horizontal: "right",
	},
});
