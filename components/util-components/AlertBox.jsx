import { useState } from "react";
import { useRecoilState } from "recoil";
import { alertState } from "../../atoms/modalAtom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

export default function AlertBox() {
	const [alert, setAlert] = useRecoilState(alertState);
	const [hide, setHide] = useState(false);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setAlert({
			...alert,
			open: false,
		});

		// setHide(true);
	};

	function Transition(props) {
		return <Slide {...props} direction={alert.transition || "left"} />;
	}

	return (
		<div style={{ display: hide ? "none" : "block" }}>
			<Snackbar
				anchorOrigin={{
					vertical: alert.vertical || "top",
					horizontal: alert.horizontal || "right",
				}}
				open={alert.open}
				autoHideDuration={4000}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<Alert
					open={alert.open}
					onClose={handleClose}
					severity={alert.severity}
					sx={alert.style}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
