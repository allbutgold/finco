import styles from "./Login.module.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userStore } from "../../utils/userStore.js";
import Header from "../../components/Header/Header";
import toast, { Toaster } from "react-hot-toast";
import { navigateWithDelay } from "../../utils/helper";
import Password from "../../components/Basic/Password";

const Login = () => {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPassword, setInputPassword] = useState("");

	const URL = import.meta.env.VITE_BACKEND_URL;
	const navigator = useNavigate();

	//* userStore
	const setUser = (value) => userStore.getState().setUserID(value);
	const setUsername = (value) => userStore.getState().setUsername(value);
	const setUserPic = (value) => userStore.getState().setUserPic(value);

	const login = async (event) => {
		event.preventDefault();
		const loginUser = fetch(URL + "login", {
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
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Invalid mail or password");
				} else {
					return response.json();
				}
			})
			.then((user) => {
				setUser(user.id);
				setUsername(user.user);
				if (user.pic) {
					setUserPic(URL + user.pic);
					navigateWithDelay(navigator, "/", 2000);
				} else {
					navigateWithDelay(navigator, "/setup", 2000);
				}
			})
			.catch((err) => {
				console.error(err);
				throw new Error(err);
			});

		await toast.promise(loginUser, {
			loading: "Checking Credentials",
			success: "Perfect! You logged in!",
			error: (err) => {
				console.error(err);
				return "Please try again :(";
			},
		});
	};

	return (
		<section className={styles.Login}>
			<Toaster />
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
				{/* <input
					type="password"
					id="password"
					name="password"
					value={inputPassword}
					onChange={(event) => setInputPassword(event.target.value)}
					placeholder="Password"
					required
				/> */}
				<Password
					value={inputPassword}
					onChange={(event) => setInputPassword(event.target.value)}
				/>

				<Link>Forgot password?</Link>
				<button
					className={inputEmail == " " && inputPassword == " " && "failed"}
					type="submit">
					Login
				</button>
			</form>
			<p>
				Don`t have an account ? <Link to="/register">Sign up</Link>
			</p>
		</section>
	);
};

export default Login;
