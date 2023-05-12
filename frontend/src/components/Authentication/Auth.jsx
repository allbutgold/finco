import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";

import Navigation from "../Navigation/Navigation.jsx";
import SplashScreen from "../SplashScreen/SplashScreen.jsx";

const Auth = () => {
	const [isLoading, setIsLoading] = useState(true);
	const navigator = useNavigate();

	const URL = import.meta.env.VITE_BACKEND_URL;
	const setUser = (value) => userStore.getState().setUserID(value);
	const clearStorage = () => {
		userStore.setState({ userID: null, username: null, userPic: null });
		console.log("Cleared Storage");
	};

	useEffect(() => {
		(async () => {
			const response = await fetch(URL + "auth", { credentials: "include" });
			if (response.ok) {
				setIsLoading(false);
				const user = await response.json();
				// console.log(user);
				setUser(user);

				return;
			}
			clearStorage();
			navigator("/onboarding");
		})();
	}, []);

	if (isLoading) {
		return <SplashScreen />;
	}

	return (
		<div className="layout">
			<div className="content">
				<Outlet />
			</div>
			<div className="nav">
				<Navigation />
			</div>
		</div>
	);
};

export default Auth;
