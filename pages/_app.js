import "../styles/globals.css";
import { useRouter, Router } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import { Analytics } from "@vercel/analytics/react";
import "../styles/nprogress-bar.css";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// If loading a variable font, no need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

// Attach Router event listeners for NProgress
Router.events.on("routeChangeStart", (url) => {
	console.log(url);
	if (url.startsWith("/playgroups/")) return;
	else NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// Remove CONSOLE LOGS from Production
if (process.env.NODE_ENV === "production") {
	console.log = () => {};
	console.warn = () => {};
	console.error = () => {};
}
const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
	const router = useRouter();

	// exclude app-wide layout for the routes contained in the array
	const excludeLayout = ["/signin", "/about"].includes(router.pathname);

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<SessionProvider session={session}>
					{excludeLayout && (
						<Component {...pageProps} className={inter.className} />
					)}
					{!excludeLayout && (
						<Layout className={inter.className}>
							<Component {...pageProps} />
							<Analytics />
						</Layout>
					)}
				</SessionProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default MyApp;
