import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	if (req.nextUrl.pathname.startsWith("/_next")) return NextResponse.next();

	//TODO: Review this check
	//check if user is trying to authenticate or they have a token -
	if (req.nextUrl.pathname.includes("/api/auth") || token) {
		return NextResponse.next();
	}

	// check if they don't have a token and the request is for an auth-required route
	if (!token && req.nextUrl.pathname !== "/signin") {
		const url = req.nextUrl.clone();

		url.pathname = "/signin";
		return NextResponse.rewrite(url);
	}
}
