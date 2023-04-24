import NextAuth from "next-auth";
import spotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotifyAccess";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function refreshAccessToken(token) {
	try {
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshToken);

		// Refresh the access token and rename the body as refreshedToken
		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.error(error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export default NextAuth({
	providers: [
		spotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],

	secret: process.env.JWT_SECRET,

	session: {
		strategy: "jwt",
	},

	pages: {
		signIn: "/signin",
	},

	callbacks: {
		async jwt({ token, account, user }) {
			// If the user is new, we'll need to create a new token
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			}

			// Return token if it's not expired
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			// else - refresh token
			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;
			return session;
		},

		async signIn({ user }) {
			// Check if user exists in the database
			console.log(user);
			const existingUser = await prisma.user.findUnique({
				where: { id: user.id },
			});

			// If user doesn't exist, create a new user in the database
			if (!existingUser) {
				await prisma.user.create({
					data: {
						id: user.id,
						name: user.name,
						email: user.email,
					},
				});
			}

			return true;
		},
	},
});
