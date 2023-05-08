import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import WeeklyMVPEmail from "./WeeklyMVPEmail";

import { prisma } from "../../server/db/client";

export async function SendEmails() {
	const users = await prisma.user.findMany();

	// const transporter = nodemailer.createTransport({
	// 	service: "Outlook",
	// 	auth: {
	// 		user: process.env.EMAIL_USER,
	// 		pass: process.env.EMAIL_PASS,
	// 	},
	// });

	console.log("users", users);

	const dummyUsers = [
		{
			name: "Alpha",
			email: "hayusuf003@gmail.com",
		},
		{
			name: "Theta",
			email: "hayven0@outlook.com",
		},
	];

	const transporter = nodemailer.createTransport({
		host: "smtp-relay.sendinblue.com",
		port: 587,
		auth: {
			user: "haythepen@gmail.com",
			pass: "QWVJw1gvjzRqCdBH",
		},
	});

	const emailPromises = dummyUsers.map(async (user) => {
		try {
			const emailHtml = render(<WeeklyMVPEmail name={user.name} url="https://example.com" />);
			const options = {
				from: "haythepen@gmail.com",
				to: user.email,
				subject: `Hello, ${user.name}!`,
				html: emailHtml,
			};

			await transporter.sendMail(options);

			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log("Email sent -- ");
		} catch (err) {
			console.log("🚀 ~ file: SendEmails.jsx:47 ~ emailPromises ~ err:", err);
		}
	});

	await Promise.all(emailPromises);
}
