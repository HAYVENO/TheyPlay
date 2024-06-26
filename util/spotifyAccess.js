import SpotifyWebApi from "spotify-web-api-node";

// const scopes = [
// 	"user-read-email",
// 	"playlist-read-collaborative",
// 	// "streaming",
// 	"user-read-private",
// 	"user-library-read",
// 	"user-top-read",
// 	// "user-read-playback-state",
// 	// "user-modify-playback-state",
// 	// "user-read-currently-playing",
// 	"user-read-recently-played",
// 	"playlist-modify-public",
// 	"playlist-modify-private",
// 	"user-library-modify",
// 	// "user-follow-read",
// 	"ugc-image-upload",
// ].join(",");

const scopes = [
	"user-read-email",
	"playlist-read-collaborative",
	"user-read-private",
	"user-library-read",
	"user-top-read",
	"user-read-recently-played",
	"playlist-modify-public",
	"playlist-modify-private",
	"user-library-modify",
	"ugc-image-upload",
].join(",");

const params = {
	scope: scopes,
};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
