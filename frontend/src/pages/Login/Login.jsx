import styles from "./Login.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";

const Login = () => {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const URL = import.meta.env.VITE_BACKEND_URL;
	const navigator = useNavigate();

	//*==== HANNI WAR HIER ====
	const setUser = (value) => {
		userStore.getState().setUserID(value);
	};
	const setUsername = (value) => {
		userStore.getState().setUsername(value);
	};
	const setUserPic = (value) => {
		userStore.getState().setUserPic(value);
	};
	//*==== HANNI WAR HIER ====

	const login = async (event) => {
		event.preventDefault();
		const response = await fetch(URL + "login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				account: {
					email: inputEmail,
					password: inputPassword,
				},
			}),
			credentials: "include",
		});
		if (response.ok) {
			//*==== HANNI WAR HIER ====
			const user = await response.json();
			setUser(user.id);
			setUsername(user.user);
			setUserPic(URL + user.pic);
			//*==== HANNI WAR HIER ====
			navigator("/");
		}
	};

	return (
		<section className={styles.Login}>
			<h1>Login</h1>
			<form onSubmit={login}>
				<input
					type="text"
					value={inputEmail}
					onChange={(event) => setInputEmail(event.target.value)}
					placeholder="email"
				/>
				<input
					type="password"
					value={inputPassword}
					onChange={(event) => setInputPassword(event.target.value)}
					placeholder="password"
				/>
				<button type="submit">Login</button>
			</form>
		</section>
	);
};

export default Login;
