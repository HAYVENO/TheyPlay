import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilValue } from "recoil";
import { openBackDropState } from "../atoms/modalAtom";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function SimpleBackdrop() {
	const openBackDrop = useRecoilValue(openBackDropState);

	return (
		<div>
			<Backdrop
				sx={{
					color: "rgb(255, 180, 255)",
					backgroundColor: "rgb(0, 0, 0, 0.7)",
					backdropFilter: "saturate(0.3)",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={openBackDrop}
			>
				{/* <CircularProgress color="inherit" /> */}

				<PropagateLoader color="rgb(255, 180, 255)" />
			</Backdrop>
		</div>
	);
}
