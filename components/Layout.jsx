import Sidebar from "./Sidebar";
import Player from "./Player";
import { SkeletonTheme } from "react-loading-skeleton";
import SearchModal from "./SearchModal";
import SimpleBackdrop from "./SimpleBackDrop";
import AlertBox from "./AlertBox";
import { Inter } from "@next/font/google";
import clx from "classnames";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
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
