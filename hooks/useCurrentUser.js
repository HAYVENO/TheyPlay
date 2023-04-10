import { useState, useEffect } from "react";

function useCurrentUser() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Check if the user is already logged in
		const savedUser = localStorage.getItem("currentUser");

		if (savedUser) {
			return;
		}

		// User does not exist, create a new user account
	}, []);

	return user;
}

export default useCurrentUser;

// function App() {
//   const currentUser = useCurrentUser();

//   if (!currentUser) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {currentUser.name}!</h1>
//       <p>Your email address is {currentUser.email}.</p>
//     </div>
//   );
// }
