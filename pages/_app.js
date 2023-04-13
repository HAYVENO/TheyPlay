import "../styles/globals.css";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";

// If loading a variable font, no need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter();

	// exclude app-wide layout for the routes contained in the array
	const excludeLayout = ["/signin", "/about"].includes(router.pathname);

	return (
		<RecoilRoot>
			<SessionProvider session={session}>
				{excludeLayout && <Component {...pageProps} />}
				{!excludeLayout && (
					<Layout className={inter.className}>
						<Component {...pageProps} />
					</Layout>
				)}
			</SessionProvider>
		</RecoilRoot>
	);
}
