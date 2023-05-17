import React from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import { BsThreeDots } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { openChildModalState } from "../atoms/modalAtom";

const TrackCard = ({ playlist: track }) => {
	const [openChildModal, setOpenChildModal] = useRecoilState(openChildModalState);

	const handleOpenChildModal = () => {
		setOpenChildModal(true);
	};

	return (
		<li key={track?.id} className="category__playlist">
			<Link href={`#${track.id}`} className="category__playlist-link">
				<div className="playlist__card">
					<h3 className="playlist__title">{track.name}</h3>
					<Popover.Root>
						<Image
							className="playlist__image"
							width={120}
							height={120}
							alt={track.name}
							src={track?.album?.images[0]?.url}
							priority
						/>
						<Popover.Trigger asChild>
							<button className="popover-btn">
								<BsThreeDots color="white" size={18} />
							</button>
						</Popover.Trigger>
						<Popover.Portal>
							<Popover.Content>
								<button className="ATP-btn" onClick={() => handleOpenChildModal(track.id)}>
									<span>Add to a playgroup</span>
									<CgPlayListAdd size={18} />
								</button>
							</Popover.Content>
						</Popover.Portal>
					</Popover.Root>
				</div>
			</Link>
		</li>
	);
};

export default TrackCard;
