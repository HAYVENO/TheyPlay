import { SendEmails } from "../../components/emails/SendEmails";

export default async function handler(req, res) {
	try {
		await SendEmails();
		console.log("Running send-emails function");
		res.status(200).end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}
