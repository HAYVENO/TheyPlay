const formatToSentence = (array, fieldName) => {
	console.log(array);
	return array
		.map((item, index, array) => {
			if (index === array.length - 2) {
				return `${item[fieldName]} & `;
			} else if (index === array.length - 1) {
				return `${item[fieldName]}`;
			} else {
				return `${item[fieldName]}, `;
			}
		})
		.join("");
};

export default formatToSentence;
