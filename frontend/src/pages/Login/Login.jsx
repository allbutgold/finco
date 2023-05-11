import styles from "./Login.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const Login = () => {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const URL = import.meta.env.VITE_BACKEND_URL;
	const navigator = useNavigate();

	//*==== HANNI WAR HIER ====
	const setUser = (value) => userStore.getState().setUserID(value);
	const setUsername = (value) => userStore.getState().setUsername(value);
	const setUserPic = (value) => userStore.getState().setUserPic(value);
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
			if (user.pic) {
				setUserPic(URL + user.pic);
				//*==== HANNI WAR HIER ====
				navigator("/");
			} else {
				navigator("/setup");
			}
		}
	};

	return (
		<section className={styles.Login}>
			<Header />
			<h1>Welcome back</h1>
			<p>Never miss a payment again with our finance tracking app.</p>
			<form onSubmit={login}>
				<label htmlFor="email" hidden>
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={inputEmail}
					onChange={(event) => setInputEmail(event.target.value)}
					placeholder="Email"
          required
				/>
				<label htmlFor="password" hidden>
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					value={inputPassword}
					onChange={(event) => setInputPassword(event.target.value)}
					placeholder="Password"
          required
				/>
				<Link>Forgot password?</Link>
				<button type="submit">Login</button>
			</form>
			<p>
				Don`t have an account ? <Link to="/register">Sign up</Link>
			</p>
		</section>
	);
};

export default Login;
