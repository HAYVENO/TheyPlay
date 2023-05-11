import React from "react";
import Image from "next/image";

const LinkPreview = ({ imageUrl, conf }) => {
	return (
		<div className={`footer__image-preview ${conf}`}>
			<Image
				style={{ objectFit: "cover" }}
				src={imageUrl}
				alt="Yusuf Abdulhafeez link preview"
				width={150}
				height={116}
				loading="lazy"
			/>
		</div>
	);
};

export default LinkPreview;
