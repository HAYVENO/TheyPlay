import React from "react";
import Link from "next/link"; // Import Next.js Link
import getInitials from "../util/getInitials";
import { Avatar } from "@mui/material";
import * as Popover from "@radix-ui/react-popover";

import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { CgPlayListAdd } from "react-icons/cg"; // Import your icons
import { BsPeople } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { openModalState } from "../atoms/modalAtom";

const Header = ({ isLoading }) => {
	const { data: session, status } = useSession();
	const [openModal, setOpenModal] = useRecoilState(openModalState);

	const handleOpenModal = (e) => {
		setOpenModal(true);
	};

	return (
		<header
			className="center__heading"
			style={{ backdropFilter: "blur(30px)" }}
		>
			<button className="btn__add-song" onClick={handleOpenModal}>
				<CgPlayListAdd size={20} />
				<span>Add music</span>
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
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			)}
		</header>
	);
};

export default Header;
