const convertToFive = (percent) => {
	const toFive = (percent / 100) * 5;
	return parseFloat(toFive.toFixed(1));
};

export default convertToFive;
