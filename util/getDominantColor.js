import ColorThief from "colorthief";

export default function getDominantColor(imageUrl) {
	return new Promise((resolve, reject) => {
		const colorThief = new ColorThief();
		const img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = imageUrl;

		img.addEventListener("load", () => {
			const dominantColor = colorThief.getColor(img);
			resolve(dominantColor);
		});

		img.addEventListener("error", () => {
			reject(new Error("Unable to load image"));
		});
	});
}
