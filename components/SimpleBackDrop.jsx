import Backdrop from "@mui/material/Backdrop";
import { useRecoilValue } from "recoil";
import { openBackDropState } from "../atoms/modalAtom";
import ScaleLoader from "react-spinners/ScaleLoader";

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

				<ScaleLoader color="lightblue" />
			</Backdrop>
		</div>
	);
}
