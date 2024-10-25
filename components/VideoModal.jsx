import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

const YouTubeModal = ({ youtubeUrl, videoModalOpen, onClose }) => {
	return (
		<>
			<Modal
				sx={{ zIndex: 99999999 }}
				open={videoModalOpen}
				onClose={() => onClose()}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="see-demo-modal">
					<iframe
						// 16:9
						width="100%"
						height="563"
						src={youtubeUrl}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			</Modal>
		</>
	);
};

export default YouTubeModal;
