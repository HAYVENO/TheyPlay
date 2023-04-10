import React from "react";
import Image from "next/image";
import Logo from "../public/logo-test.svg";
import styles from "../styles/signIn.module.css";
import { getProviders, signIn } from "next-auth/react";

const SignIn = ({ providers }) => {
	console.log("🚀 ~ file: signin.jsx:31 ~ getServerSideProps ~ providers", providers);

	return (
		<div className={styles.container}>
			<div className={styles.imageBox}>
				<Image width={250} src={Logo} alt="TheyPlay logo" priority />
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
