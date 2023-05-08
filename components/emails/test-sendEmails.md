// import { render } from "@react-email/render";
// import nodemailer from "nodemailer";
// import WeeklyMVPEmail from "./WeeklyMVPEmail";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function SendEmails() {
// 	const users = await prisma.user.findMany();

// 	// const transporter = nodemailer.createTransport({
// 	// 	service: "Outlook",
// 	// 	auth: {
// 	// 		user: process.env.EMAIL_USER,
// 	// 		pass: process.env.EMAIL_PASS,
// 	// 	},
// 	// });

// 	console.log("users", users);

// 	const dummyUsers = [
// 		{
// 			name: "Alpha",
// 			email: "hayusuf003@gmail.com",
// 		},
// 		{
// 			name: "Theta",
// 			email: "hayven0@outlook.com",
// 		},
// 	];

// 	const emailList = dummyUsers.map((user) => user.email);
// 	console.log("🚀 ~ file: SendEmails.jsx:34 ~ SendEmails ~ emailList:", emailList);

// 	const transporter = nodemailer.createTransport({
// 		pool: true,
// 		host: "smtp-relay.sendinblue.com",
// 		port: 587,
// 		auth: {
// 			user: "haythepen@gmail.com",
// 			pass: "QWVJw1gvjzRqCdBH",
// 		},

// 		// pool: true, // enable pooling
// 		// poolMaxConnections: 10, // maximum number of connections to allow
// 		// poolMaxMessages: 100, // maximum number of messages to send per connection
// 		// poolIdleTimeout: 10000, // timeout in milliseconds
// 		// poolTimeout: 5000, // connection timeout in milliseconds
// 	});
// 	const emailPromises = async (emailList) => {
// 		const emailHtml = render(<WeeklyMVPEmail url="https://example.com" />);
// 		console.log(emailList);
// 		const userEmails = emailList.join(", ");
// 		console.log("🚀 ~ file: SendEmails.jsx:53 ~ emailPromise ~ userEmails:", userEmails);
// 		const options = {
// 			from: "haythepen@gmail.com",
// 			to: userEmails,
// 			subject: "Hello, everyone!",
// 			html: emailHtml,
// 		};

// 		try {
// 			await transporter.sendMail(options);
// 			console.log("Email sent successfully");
// 		} catch (err) {
// 			console.log("Error sending email:", err);
// 		}
// 	};

// 	emailPromises(emailList);
// }
