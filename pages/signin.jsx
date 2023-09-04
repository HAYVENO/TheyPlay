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
import "animate.css";
import WordsRotator from "../components/util-components/WordsRotator";

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
	const [showTooltip, setShowTooltip] = useState(false);

	useEffect(() => {
		async function getTheProviders() {
			const providersList = await getProviders();
			console.log(providersList);
			setProviders(providersList);
		}

		getTheProviders();

		// Tooltip timer function
		const showTimer = setTimeout(() => {
			setShowTooltip(true);
			const hideTimer = setTimeout(() => {
				setShowTooltip(false);
			}, 7000);
			return () => {
				clearTimeout(hideTimer);
			};
		}, 8000);

		return () => {
			clearTimeout(showTimer);
		};
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
						<Image
							style={{ marginRight: "4px" }}
							src={logoZero}
							alt="TheyPlay-Logo"
							width={34}
							height={34}
						/>

						<strong>TheyPlay</strong>
					</div>
					<div className="header-items">
						<strong style={{ borderRight: "1px solid white" }}></strong>
						<strong
							onClick={() => signIn("spotify", { callbackUrl: "/" })} //hardcoded the spotify providerId here --
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
								open={showTooltip}
								placement="bottom-end"
								title={
									<span className="tooltip-title">
										You don't have a Spotify account yet? Don't miss
										out. Sign up for free — takes{" "}
										<b>less than 20 seconds</b>, and you get FREE
										access to Spotify's 80M songs.{" "}
										<b>No credit card required.</b>
										<br />
										<br />
										1. <b>Click sign up</b> (and follow the prompts).
										<br />
										2. <b>Return to this page</b> to sign in.
									</span>
								}
								onMouseEnter={() => setShowTooltip(true)}
								onMouseLeave={() => setShowTooltip(false)}
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
							<h1 className="heading-primary  ">
								Discover and Share only the Best Songs of Life with{" "}
								<div className="rotator-container">
									<WordsRotator
										texts={[
											"family",
											"friends",
											"colleagues",
											"everyone!",
										]}
									/>
								</div>{" "}
							</h1>

							<h2 className="heading-secondary   animate__animated animate__fadeIn ">
								Build your perfect music catalogue with music lovers
								worldwide — play what they decide and decide what They
								play ♫
							</h2>
						</div>
						{Object.values(providers).map((provider) => (
							<div key={provider.name}>
								<button
									className="sign-in-button animate__animated animate__bounceIn animate__delay-1s "
									onClick={() =>
										signIn(provider.id, { callbackUrl: "/" })
									}
								>
									Continue with {provider.name}{" "}
									<SlSocialSpotify size={18} />
								</button>
							</div>
						))}
						<footer className="s-footer">
							<div style={{ margin: 0 }}>
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
							</div>
							<a
								href="https://twitter.com/hay_yusuf"
								target="_blank"
								rel="noopener noreferrer"
							>
								<SlSocialTwitter
									className="s-footer-bird"
									color="lightblue"
									size={20}
								/>
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
