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
	"ugc-image-upload",
	"playlist-modify-public",
	"playlist-modify-private",
	"user-follow-modify",
	"user-top-read",
	"user-read-recently-played",
	"user-read-email",
	"user-read-private",

	//
	// "user-follow-read",
	// "playlist-read-collaborative",
	// "user-library-read",
	// "user-library-modify",
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
