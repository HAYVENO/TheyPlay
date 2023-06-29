import Head from "next/head";
import Layout from "../components/Layout";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { PrismaClient } from "@prisma/client";
import playgroups from "./api/playgroups";

export default function Home() {
	return (
		<>
			<Head>
				<title>
					TheyPlay | Your Group-controlled Music discovery experience
				</title>
			</Head>
			<main>
				<Center />
			</main>
		</>
	);
}

// export async function getServerSideProps() {
// 	const prisma = new PrismaClient();
// 	try {
// 		const playGroupsData = await prisma.playgroup.findMany();
// 		console.log(playGroupsData);
// 		return { props: { playGroupsData } };
// 	} catch (err) {
// 		console.log(err);
// 		return { props: { playGroupsData: [] } };
// 	}
// }
