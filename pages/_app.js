import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import SearchModal from "../components/SearchModal";
import SimpleBackdrop from "../components/SimpleBackDrop";
import AlertBox from "../components/AlertBox";

// If loading a variable font, no need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<RecoilRoot>
			<SessionProvider session={session}>
				<Layout className={inter.className}>
					<Component {...pageProps} />
				</Layout>
			</SessionProvider>
		</RecoilRoot>
	);
}
