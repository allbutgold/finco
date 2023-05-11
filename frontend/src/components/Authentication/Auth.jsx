import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";

import Navigation from "../Navigation/Navigation.jsx";

const Auth = () => {
	const [isLoading, setIsLoading] = useState(true);
	const navigator = useNavigate();

	const URL = import.meta.env.VITE_BACKEND_URL;
	const setUser = (value) => {
		userStore.getState().setUserID(value);
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
			navigator("/login");
		})();
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<Outlet />
			<Navigation />
		</>
	);
};

export default Auth;
