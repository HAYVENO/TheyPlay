import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../public/logo-test.svg";
import bgAnimation from "../public/bg-animation.svg";
import { getProviders, signIn } from "next-auth/react";
import AnimatedSvg from "../components/util-components/AnimatedSvg";

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

	return (
		<div className="container">
			<div
				className="hero-animation"
				style={{
					margin: "0",
					maxWidth: "1200px",
					height: "100%",
					position: "absolute",
					bottom: "0",
					width: "50%",
					overflow: "hidden",
					filter: "blur(40px)",
					zIndex: "-1",
				}}
			>
				<AnimatedSvg />
			</div>
			<div className="heading-container">
				<h1 className="heading-primary">
					Discover and Share only the Best Songs of Life with <span>family</span>.{" "}
				</h1>
				<h2 className="heading-secondary">
					Build your perfect music catalogue with those that matter. Play what they decide and
					decide what They play ♫
				</h2>
			</div>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						className="sign-in-button"
						onClick={() => signIn(provider.id, { callbackUrl: "/" })}
					>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default SignIn;
