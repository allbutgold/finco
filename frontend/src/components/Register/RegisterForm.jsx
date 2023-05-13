import styles from "./RegisterForm.module.scss";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { navigateWithDelay } from "../../utils/helper";
import Password from "../Basic/Password";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [agreedToTnC, setAgreedToTnC] = useState(false);
	const navigate = useNavigate();

	const URL = import.meta.env.VITE_BACKEND_URL;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const createAccount = fetch(URL + "register", {
			credentials: "include",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				account: { username, password, email, agreedToTnC },
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Invalid mail or password");
				} else {
					return response.text();
				}
			})
			.then((data) => {
				console.log(data);
				// e.target.reset();
				navigateWithDelay(navigate, "/login", 1500);
			})
			.catch((error) => {
				console.error(error);
				throw new Error(err);
			});

		await toast.promise(createAccount, {
			loading: "Checking Credentials",
			success: "Perfect! You signed up!",
			error: (err) => {
				console.error(err);
				return "Could not register! SORRY!!!";
			},
		});
	};

	return (
		<section className={styles.RegisterForm}>
			<Toaster />
			<form onSubmit={handleSubmit}>
				<label htmlFor="name" hidden>
					Name
				</label>

				<input
					placeholder="Name"
					type="text"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor="email" hidden>
					Email
				</label>
				<input
					placeholder="Email"
					type="email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="password" hidden>
					Password
				</label>
				{/* <input
					placeholder="Password"
					type="password"
					name="password"
					onChange={(e) => setPassword(e.target.value)}
				/> */}

				<Password onChange={(e) => setPassword(e.target.value)} />
				<div>
					<input
						type="checkbox"
						name="T&C"
						value={true}
						onChange={(e) => setAgreedToTnC(e.target.value)}
						required
					/>
					<label htmlFor="T&C">
						Agree to our<b> Terms and Service</b>
					</label>
				</div>
				<button type="submit">Register Now</button>
			</form>
		</section>
	);
};

export default RegisterForm;
