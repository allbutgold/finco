import { userStore } from "../../utils/userStore.js";
const LogoutButton = () => {
	const URL = import.meta.env.VITE_BACKEND_URL;

	const clearStorage = () => {
		userStore.setState({ userID: null, username: null, userPic: null });
		console.log("Cleared Storage");
	};
	const handleLogout = async () => {
		try {
			const response = await fetch(URL + "logout", {
				method: "POST",
				credentials: "include",
			});
			if (response.ok) {
				// Reset user state in userStore or any other state management tool you're using
				// Redirect the user to the login page
				clearStorage();
				window.location.href = "/login";
			} else {
				throw new Error("Logout failed");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
