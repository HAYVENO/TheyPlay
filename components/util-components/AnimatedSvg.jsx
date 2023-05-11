import React from "react";

const AnimatedSvg = () => {
	return (
		<svg
			className="svg_WDAo"
			viewBox="0 0 1 1"
			style={{ width: "100%", zIndex: -1, position: "absolute" }}
		>
			<path
				d="M0.3,0.5a0.2,0.45 0 1,0 0.4,0a0.2,0.45 0 1,0 -0.4,0"
				fill="none"
				stroke="#5373ff" //stroke color for first blob
				strokeLinecap="round"
				strokeWidth="0.035"
				className="p_ZII8"
				style={{
					transformOrigin: "center center",
					transform: "rotate(0deg)",
					animation: "12s linear 0s infinite normal none running bganimation",
					strokeDasharray: "0.423654, 1.69462",
				}}
			/>
			<path
				d="M0.3,0.5a0.2,0.45 0 1,0 0.4,0a0.2,0.45 0 1,0 -0.4,0"
				fill="none"
				stroke="#ff53f6" //stroke color for second blob
				strokeLinecap="round"
				strokeWidth="0.035"
				className="p_ZII8"
				style={{
					transformOrigin: "center center",
					transform: "rotate(240deg)",
					animation: "16s linear 0s infinite normal none running bganimation",
					strokeDasharray: "0.423654, 1.69462",
				}}
			/>
		</svg>
	);
};

export default AnimatedSvg;
