
import forward from "../../assets/img/forward.svg";
import logout from "../../assets/img/logout.svg";
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

    return <button onClick={handleLogout}><img src={logout} alt="arrow" />Logout<img src={forward} alt="arrow" /></button>;

};

export default LogoutButton;
