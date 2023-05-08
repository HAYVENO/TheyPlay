/* eslint-disable react/no-unescaped-entities */
import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

const WeeklyMVPEmail = ({
	username = "Goodman",
	userImage = `${baseUrl}/static/vercel-user.png`,
	invitedByUsername = "bukinoshita",
	invitedByEmail = "bukinoshita@example.com",
	teamName = "My Project",
	teamImage = `${baseUrl}/static/vercel-team.png`,
	inviteLink = "https://vercel.com/teams/invite/foo",
	inviteFromIp = "204.13.186.218",
	inviteFromLocation = "São Paulo, Brazil",
}) => {
	const previewText = `Announcing this week's TheyPlay MVP ✨`;

	const codeContainer = {
		background: "rgba(0,0,0,.05)",
		borderRadius: "4px",
		verticalAlign: "middle",
		width: "100%",
		padding: "12px",
	};

	const container = {
		paddingLeft: "12px",
		paddingRight: "12px",
		margin: "0 auto",
		border: "1px solid rgba(0,0,0,.05)",
	};

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src={`${baseUrl}/static/vercel-logo.png`}
								width="40"
								height="37"
								alt="Vercel"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							<p>
								This Week&apos;s <strong> TheyPlay MVP</strong> is <strong>ADELEKE</strong>{" "}
								🎉🥳
							</p>
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Hi <strong>{username},</strong>
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							It's been another week of great music 🎉🎶 and we're excited to take a moment
							to recognize this week's TheyPlay MVP - <strong>[insert name here]</strong>!
							🥳👏
						</Text>
						<Section style={{ ...container }}>
							<Section style={{ marginTop: "32px" }}>
								<Row>
									<Column align="center">
										<Img
											className="rounded-full"
											src={userImage}
											width="64"
											height="64"
										/>
									</Column>

									{/* <Column align="left">
									<Img className="rounded-full" src={teamImage} width="64" height="64" />
								</Column> */}
								</Row>
							</Section>
							<Section className="text-center mt-[32px] mb-[32px]">
								<Button
									pX={20}
									pY={12}
									className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
									href={inviteLink}
								>
									Follow
								</Button>
							</Section>
						</Section>
						<Text>
							Now to <strong>each Playgroup</strong>. Below are the Playgroups' MVPs and
							their best performing songs for the week:
							<br />
						</Text>
						<Section style={codeContainer}>
							<Text className="text-black text-[14px] leading-[24px]">
								[Playgroup 1] MVP: <strong>[insert name here]</strong>, Highest Performing
								Song: <strong>[insert song title here]</strong>
								<br />
								[Playgroup 2] MVP: <strong>[insert name here]</strong>, Highest Performing
								Song: <strong>[insert song title here]</strong>
								<br />
								[Playgroup 3] MVP: <strong>[insert name here]</strong>, Highest Performing
								Song: <strong>[insert song title here]</strong>
								<br />
								[Playgroup 4] MVP: <strong>[insert name here]</strong>, Highest Performing
								Song: <strong>[insert song title here]</strong>
								<br />
							</Text>
						</Section>
						<Text>
							<br />
							I would also like to thank you for your fantastic contributions to TheyPlay.
							Keep sharing your best tunes, and the feelings they evoke, with others in the
							groups. Who knows, you could be next week's MVP! 💪
							<br />
							<br />
							Cheers to another week of playing what they decide, and deciding what TheyPlay.
							🥂🎧
							<br />
							<br />
							Regards,
							<br />
							HAYVENO
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							This invitation was intended for{" "}
							<span className="text-black">{username} </span>.This invite was sent from{" "}
							<span className="text-black">{inviteFromIp}</span> located in{" "}
							<span className="text-black">{inviteFromLocation}</span>. If you were not
							expecting this invitation, you can ignore this email. If you are concerned
							about your account's safety, please reply to this email to get in touch with
							us.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default WeeklyMVPEmail;
