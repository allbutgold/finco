import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";

const Auth = () => {
	const [isLoading, setIsLoading] = useState(true);
	const navigator = useNavigate();

	const URL = import.meta.env.VITE_BACKEND_URL;
	//* HAN
	const setUser = (value) => {
		userStore.getState().setUserID(value);
	};
	//* HAN

	useEffect(() => {
		(async () => {
			const response = await fetch(URL + "auth", { credentials: "include" });
			if (response.ok) {
				setIsLoading(false);
				const user = await response.json();
				// console.log(user);
				//*HAN
				setUser(user);
				//*HAN

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
		</>
	);
};

export default Auth;
