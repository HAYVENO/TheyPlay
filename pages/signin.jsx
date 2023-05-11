/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import logoZero from "../public/logo-zero.svg";
import { BsGithub } from "react-icons/bs";
import { SlSocialSpotify, SlSocialTwitter } from "react-icons/sl";
import { getProviders, signIn } from "next-auth/react";
import AnimatedSvg from "../components/util-components/AnimatedSvg";
import LinkPreview from "../components/util-components/LinkPreview";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
export async function getServerSideProps() {
	const providers = await getProviders();

	console.log(providers);

	return {
		props: {
			providers,
		},
	};
}
const SignIn = () => {
	// console.log("🚀 ~ file: signin.jsx:31 ~ getServerSideProps ~ providers", providers);

	const [providers, setProviders] = useState([]);

	useEffect(() => {
		async function getTheProviders() {
			const providersList = await getProviders();
			console.log(providersList);
			setProviders(providersList);
		}

		getTheProviders();
	}, []);
	console.log(providers);

	return (
		<>
			<Head>
				<title>Sign in - TheyPlay Music App</title>
			</Head>
			<header className="s-header">
				<nav className="s-header-container">
					<div className="s-app-title">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							id="logo"
							fill="white"
							width={30}
							height={30}
						>
							<path d="M6.61659 4.35541c.2273-.1352.50901-.14069.74141-.01445l9 4.88889c.2299.1249.3782.36062.3911.62197.0129.26138-.1113.51058-.3278.65758l-8.99999 6.1111c-.22977.156-.52696.1723-.77239.0423-.24543-.1301-.39892-.3851-.39892-.6628v-11c0-.26447.13929-.50939.36659-.64459zM12 18.25c-.4142 0-.75.3358-.75.75 0 .4142.3358.75.75.75h5c.4142 0 .75-.3358.75-.75 0-.4142-.3358-.75-.75-.75h-5z"></path>
						</svg>
						<strong>TheyPlay</strong>
					</div>
					<div className="header-items">
						<strong style={{ borderRight: "1px solid white" }}></strong>
						<strong
							// onClick={() => signIn("spotify", { callbackUrl: "/" })} //hardcoded the spotify providerId here --
							className="sign-in-text"
						>
							sign in
						</strong>
						<span style={{ fontSize: "2rem", fontWeight: "300" }}>|</span>
						<a
							id="sign-up-link"
							href="https://www.spotify.com/us/signup"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Tooltip
								arrow
								placement="bottom-end"
								title={
									<span className="tooltip-title">
										Don't have a Spotify account yet? Don't miss out. Sign up for free —
										takes less than 30 seconds, and you get FREE access to Spotify's 80M
										songs.
										<br />
										<br />
										1. Click sign up (and follow the prompts).
										<br />
										2. Return to this page to sign in.
									</span>
								}
							>
								<strong className="sign-up-text">sign up?</strong>
							</Tooltip>
						</a>
						{/* <BsGithub size={24} /> */}
					</div>
				</nav>
			</header>
			<div className="container">
				<div className="hero-animation">
					<AnimatedSvg />
				</div>
				{providers.length !== 0 ? (
					<>
						<div className="heading-container">
							<h1 className="heading-primary">
								Discover and Share only the Best Songs of Life with <span>family</span>.{" "}
							</h1>
							<h2 className="heading-secondary">
								Build your perfect music catalogue with those that matter — play what they
								decide and decide what They play ♫
							</h2>
						</div>
						{Object.values(providers).map((provider) => (
							<div key={provider.name}>
								<button
									className="sign-in-button rippleBtn"
									onClick={() => signIn(provider.id, { callbackUrl: "/" })}
								>
									Continue with {provider.name} <SlSocialSpotify size={18} />
								</button>
							</div>
						))}
						<footer className="s-footer">
							<p style={{ margin: 0 }}>
								Built with 🤍 by{" "}
								<a
									style={{ color: "white" }}
									id="yusuf-copy"
									href="https://github.com/hayveno"
									target="_blank"
									rel="noopener noreferrer"
								>
									Yusuf Abdulhafeez
								</a>
								{providers ? (
									<LinkPreview
										conf="signin-conf"
										imageUrl="https://res.cloudinary.com/detye5zx5/image/upload/v1683667680/hayveno-github-profile_nxslwy.png"
									/>
								) : (
									<Skeleton
										className="footer__image-preview "
										variant="rectangular"
										width={150}
										height={116}
									/>
								)}
							</p>
							<a
								href="https://twitter.com/hay_yusuf"
								target="_blank"
								rel="noopener noreferrer"
							>
								<SlSocialTwitter className="s-footer-bird" color="lightblue" size={20} />
							</a>
						</footer>
					</>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default SignIn;
