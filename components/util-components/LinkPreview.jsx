import React from "react";
import Image from "next/image";

const LinkPreview = ({ imageUrl }) => {
	return (
		<div className="footer__image-preview">
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
