const withImages = require("next-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
	withImages({
		reactStrictMode: true,
		images: {
			domains: [
				"mosaic.scdn.co",
				"i.scdn.co",
				"res.cloudinary.com",
				"images.unsplash.com",
			],
		},
	})
);
