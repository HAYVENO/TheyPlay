import React from "react";
import { useRecoilState } from "recoil";
import Link from "next/link";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import { BsSpotify, BsThreeDots } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { openChildModalState } from "../atoms/modalAtom";
import formatToSentence from "../util/formatToSentence";

const TrackCard = ({ playlist: track }) => {
	const [openChildModal, setOpenChildModal] =
		useRecoilState(openChildModalState);

	const handleOpenChildModal = () => {
		setOpenChildModal(true);
	};

	return (
		<li key={track?.id} className="category__playlist">
			<Link href={`#${track.id}`} className="category__playlist-link">
				<div className="playlist__card">
					<Popover.Root>
						<Image
							className="playlist__image"
							width={640}
							height={640}
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
								<div className="ATP-wrapper">
									<button
										className="ATP-btn"
										onClick={() => handleOpenChildModal(track.id)}
									>
										<span>Add to a Playgroup</span>
										<CgPlayListAdd size={18} />
									</button>
									<button
										className="ATP-btn"
										onClick={() =>
											window.open(
												`${track?.external_urls?.spotify}`,
												"_blank"
											)
										}
									>
										<span>Listen on Spotify</span>
										<BsSpotify size={18} />
									</button>
								</div>
							</Popover.Content>
						</Popover.Portal>
					</Popover.Root>

					<h3 className="playlist__title">{track.name}</h3>
					<h3 className="playlist__artists">
						{formatToSentence(track?.artists, "name")}
					</h3>
				</div>
			</Link>
		</li>
	);
};

export default TrackCard;
