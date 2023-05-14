import React from "react";

const WordsRotator = ({ texts }) => {
	const words = [...texts, texts[0]];
	return (
		<div className="words">
			{words.map((word, index) => (
				<span key={index}>{word}</span>
			))}
		</div>
	);
};

export default WordsRotator;
