export default function rgbToHue([r, g, b]) {
	(r /= 255), (g /= 255), (b /= 255);

	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);

	let h;

	if (max == min) {
		h = 0; // achromatic
	} else {
		const d = max - min;
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
		h *= 360;
		h = h.toFixed(); // convert to degrees
	}

	return h;
}
