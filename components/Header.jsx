import React, { useState } from "react";
import Link from "next/link"; // Import Next.js Link
import getInitials from "../util/getInitials";
import { Avatar, Drawer } from "@mui/material";
import * as Popover from "@radix-ui/react-popover";

import { useSession, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";

import { CgPlayListAdd } from "react-icons/cg"; // Import your icons
import { BsReverseLayoutSidebarReverse } from "react-icons/bs"; // Import your icons
import { BsPeople } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { openModalState } from "../atoms/modalAtom";
import { BiLogOut } from "react-icons/bi";
import Sidebar from "./Sidebar";

const Header = ({ isLoading, playgroupName = null }) => {
	const { data: session, status } = useSession();
	const [openModal, setOpenModal] = useRecoilState(openModalState);
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleOpenModal = (e) => {
		setOpenModal(true);
	};

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setOpenDrawer(open);
	};

	return (
		<header
			className="center__heading"
			style={{ backdropFilter: "blur(30px)" }}
		>
			{/* <Popover.Root>
				<Popover.Trigger asChild>
					
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content className="popover-dropdown">
						<Sidebar isClassed={true} />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root> */}

			<button className="btn__drawer" onClick={toggleDrawer(true)}>
				<BsReverseLayoutSidebarReverse size={32} />
			</button>

			<button className="btn__add-song" onClick={handleOpenModal}>
				<CgPlayListAdd size={20} />
				{playgroupName ? (
					<span>Add music to {playgroupName}</span>
				) : (
					<span>Add music</span>
				)}
			</button>
			{status === "authenticated" && !isLoading && (
				<Popover.Root>
					<Popover.Trigger asChild>
						<div className="user__profile">
							<div className="profile__image">
								<Avatar
									sx={{
										backgroundColor: "#fff",
										color: "#202020",
										fontSize: "0.8rem",
										width: 30,
										height: 30,
									}}
								>
									{getInitials(session.user.name)}
								</Avatar>
							</div>
							<span className="profile__name">
								{session?.user?.name}
							</span>
						</div>
					</Popover.Trigger>
					<Popover.Portal>
						<Popover.Content className="popover-dropdown">
							<Link href="/about" style={{ textDecoration: "none" }}>
								<button className="dropdown-btn">
									<span>About</span>
									<BsPeople size={18} />
								</button>
							</Link>
							<Link
								href="/privacy-policy"
								style={{ textDecoration: "none" }}
							>
								<button className="dropdown-btn">
									<span>Privacy Policy</span>
									<MdOutlinePrivacyTip size={18} />
								</button>
							</Link>
							<Link href="" style={{ textDecoration: "none" }}>
								<button
									onClick={() => signOut()}
									className="dropdown-btn"
								>
									<span>Sign out</span>
									<BiLogOut size={18} />
								</button>
							</Link>
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			)}
			{/* Drawer component */}
			<Drawer
				anchor="left" // Specify the anchor position (left in this case)
				open={openDrawer} // Open state of the drawer
				onClose={toggleDrawer(false)} // Function to close the drawer
			>
				{/* Content inside the drawer */}
				<Sidebar isDrawer={true} />
			</Drawer>
		</header>
	);
};

export default Header;
