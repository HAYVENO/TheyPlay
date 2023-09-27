/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";

const About = () => {
	const formattedDate = () => {
		const currentDate = new Date();
		const options = { year: "numeric", month: "long" };
		return currentDate.toLocaleDateString("en-US", options);
	};

	return (
		<>
			<Head>
				<title>About | TheyPlay</title>
			</Head>
			<main>
				<div className="privacy-policy-container">
					<h1 className="privacy-policy-container__heading">
						About | TheyPlay
					</h1>
					<hr />
					<p style={{ fontFamily: "monospace" }}>
						Last updated - {formattedDate()}{" "}
					</p>
					<p>
						This Privacy Policy describes Our policies and procedures on
						the collection, use and disclosure of Your information when
						You use the Service and tells You about Your privacy rights
						and how the law protects You.
					</p>
				</div>
			</main>
		</>
	);
};

export default About;
