import Sidebar from "./Sidebar";
import Player from "./Player";
import { SkeletonTheme } from "react-loading-skeleton";
import SearchModal from "./SearchModal";
import SimpleBackdrop from "./SimpleBackDrop";
import AlertBox from "./util-components/AlertBox";
import { Inter } from "@next/font/google";
import clx from "classnames";
import useAudioPlayback from "../hooks/useAudioPlayback";
import useSetCurrentSong from "../hooks/useSetCurrentSong";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
	// ON TRACK END EFFECT
	useAudioPlayback();
	// CURRENT SONG NUMBER CHANGE EFFECT
	useSetCurrentSong();

	return (
		<>
			<div className={clx("home-container dark-theme", inter.className)}>
				<SkeletonTheme baseColor="#202020" highlightColor="#444">
					<Sidebar />
					<main className="center">{children}</main>
					<Player />
					<SearchModal />
					<SimpleBackdrop />
					<AlertBox />
				</SkeletonTheme>
			</div>
		</>
	);
};

export default Layout;
