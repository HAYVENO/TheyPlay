export default function reformatTime(timeInMs) {
	const minutes = Math.floor(timeInMs / 60000);
	const seconds = Math.floor((timeInMs % 60000) / 1000);
	const reformattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
	return reformattedTime;
}
