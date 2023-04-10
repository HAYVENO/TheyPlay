import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta
					name="description"
					content="Discover the ultimate music app for playgroups with TheyPlay. Empowering community members with the ability to choose and control what they listen to, it is ideal for facilitating fun, engaging, and personalized music experiences. "
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
