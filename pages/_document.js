import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="title" content="TheyPlay: Explore New Music with Your Playgroup" />
				<meta
					name="description"
					content="Empowering community members to share and discover the music they love for a fun, engaging, and personalized music experience."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://they-play.vercel.app/" />
				<meta property="og:title" content="TheyPlay: Explore New Music with Your Playgroup" />
				<meta
					property="og:description"
					content="Empowering community members to share and discover the music they love for a fun, engaging, and personalized music experience."
				/>
				<meta
					property="og:image"
					content="https://res.cloudinary.com/detye5zx5/image/upload/v1682695340/TheyPlay-teaser-home_sc9wtl.png"
				/>
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://they-play.vercel.app/" />
				<meta
					property="twitter:title"
					content="TheyPlay: Explore New Music with Your Playgroup"
				/>
				<meta
					property="twitter:description"
					content="Empowering community members to share and discover the music they love for a fun, engaging, and personalized music experience."
				/>
				<meta
					property="twitter:image"
					content="https://res.cloudinary.com/detye5zx5/image/upload/v1682695340/TheyPlay-teaser-home_sc9wtl.png"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
