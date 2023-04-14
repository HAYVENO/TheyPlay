import React from "react";
import Image from "next/image";
import styles from "../styles/signIn.module.css";
import logo from "../public/logo-test.svg";
import { getProviders, signIn } from "next-auth/react";

const SignIn = ({ providers }) => {
	console.log("🚀 ~ file: signin.jsx:31 ~ getServerSideProps ~ providers", providers);

	return (
		<div className={styles.container}>
			<div className={styles.imageBox}>
				<Image width={250} height={52} src={logo} alt="TheyPlay logo" priority />
			</div>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						className={styles.signInButton}
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

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
