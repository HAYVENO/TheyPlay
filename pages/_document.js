import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />

				<meta
					name="title"
					content="TheyPlay — Discover and share the music you love with everyone."
				/>
				<meta
					name="description"
					content="Discover and share the music you love with everyone."
				/>
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://they-play.vercel.app/" />
				<meta
					property="og:title"
					content="TheyPlay: Explore New Music with Your Playgroup"
				/>
				<meta
					property="og:description"
					content="Discover and share the music you love with everyone."
				/>
				<meta
					property="og:image"
					content="https://res.cloudinary.com/detye5zx5/image/upload/v1711741717/Frame_29_2.png"
				/>
				<meta property="twitter:card" content="summary_large_image" />
				<meta
					property="twitter:url"
					content="https://they-play.vercel.app/"
				/>
				<meta
					property="twitter:title"
					content="TheyPlay: Explore New Music with Your Playgroup"
				/>
				<meta
					property="twitter:description"
					content="Discover and share the music you love with everyone."
				/>
				<meta
					property="twitter:image"
					content="https://res.cloudinary.com/detye5zx5/image/upload/v1711741717/Frame_29_2.png"
				/>

				{/* GOOGLE ANALYTICS */}
				<Script
					strategy="lazyOnload"
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>

				<Script id="GA-script" strategy="lazyOnload">
					{`
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
		  page_path: window.location.pathname,
		  });
	 `}
				</Script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
