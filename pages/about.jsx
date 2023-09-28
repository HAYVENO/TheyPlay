/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Head from "next/head";
import Image from "next/image";

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
				<section className="privacy-policy-container about-container">
					<h1 className="privacy-policy-container__heading">
						About | TheyPlay
					</h1>
					<hr />
					<p style={{ fontFamily: "monospace" }}>
						Author:{" "}
						<a
							href="https://hayveno-hive.vercel.app/"
							target="_blank"
							rel="noreferrer"
						>
							Yusuf Abdulhafeez
						</a>
					</p>
					<p>
						TheyPlay is an expression of my unwavering belief that music
						transcends mere sound — it encapsulates{" "}
						<b>
							moments, times, emotions, and our individual experiences
						</b>
						. And while headphones, earbuds and streaming services might
						seem to isolate us more everyday, they also offer an
						extraordinary means to connect with music in a deeply personal
						way.
					</p>
					<div className="about_profile">
						<div className="about_profile-left">
							<div className="profile_image-container">
								{" "}
								<Image
									className="about_profile-image"
									width={130}
									height={130}
									src={`/assets/Abdulhafeez-graduation-image 2.jpg`}
									alt="Yusuf Abdulhafeez (Founder)'s Image"
									priority
								/>
							</div>
						</div>
						<div className="about_profile-right">
							<h2>ABOUT THE CREATOR</h2>
							<p>
								Yusuf Abdulhafeez is a passionate developer with a keen
								interest in creating innovative web solutions. With
								expertise in technologies like React, Node.js, and more,
								Abdulhafeez has a track record of building robust and
								scalable applications.
							</p>

							<a
								href="https://hayveno-hive.vercel.app/"
								target="_blank"
								rel="noreferrer"
							>
								<button className="about_profile-button">
									Learn More
								</button>
							</a>
						</div>
					</div>
					<p>
						That's why I created TheyPlay — an open-sourced
						community-driven music discovery app, where music enthusiasts
						like you and I can{" "}
						<b>
							come together to share music alongside your unique
							narratives
						</b>
						. It's an endeavour to foster a controlled and harmonious
						sharing of musical experiences, making the journey of music
						exploration all the more enriching.
					</p>

					<h2>What is TheyPlay?</h2>

					<p>
						TheyPlay is a platform that helps you forge deeper connections
						through the magic of music, be it family, friends, or
						colleagues, or the rest of the world. Here, you can{" "}
						<b>
							explore new melodies, and introduce your favorite tunes to
							your Playgroups
						</b>
						.
					</p>

					<p>
						By the way, your personal data is precious, and we treat it as
						such. Robust security measures are in place to safeguard your
						privacy. You can explore the finer details in the{" "}
						<a href="/privacy-policy" target="_blank" rel="noreferrer">
							Privacy Policy
						</a>
						, where we outline our commitment to protecting your personal
						information.
					</p>

					<h2>Join and contribute to the TheyPlay Community</h2>

					<p>
						I invite you to be part of the TheyPlay community and
						contribute to making the app the best it can be. Your feedback
						and suggestions are invaluable as we continuously work to
						enhance the app and ensure it meets your needs.
					</p>

					<p>
						If you have any questions, suggestions, or would like to
						contribute to TheyPlay, be it technically or financially,
						please feel free to{" "}
						<a
							href="mailto:haythepen@gmail.com"
							target="_blank"
							rel="noreferrer"
						>
							send an email
						</a>
						,{" "}
						<a
							href="https://github.com/HAYVENO/hayveno/issues"
							target="_blank"
							rel="noreferrer"
						>
							create an issue on GitHub
						</a>
						, or reach out via{" "}
						<a
							href="https://twitter.com/hay_yusuf"
							target="_blank"
							rel="noreferrer"
						>
							Abdulhafeez's Twitter
						</a>
						.
					</p>

					<h2>Thank You!</h2>

					<p>
						Thank you for your interest in TheyPlay. I eagerly look
						forward to hearing about your experience and working together
						to make this app an incredible music discovery platform for
						everyone. Let's play, discover, and enjoy music together with
						TheyPlay!
					</p>
				</section>
			</main>
		</>
	);
};

export default About;
