import styles from "./Login.module.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
	const [inputEmail, setInputEmail] = useState("")
	const [inputPassword, setInputPassword] = useState("")

	// const URL = import.meta.env.VITE_BACKEND_URL
	const navigator = useNavigate()

	const login = async (event) => {
		event.preventDefault()
		const response = await fetch("http://localhost:9999/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: inputEmail,
				password: inputPassword,
			}),
			credentials: "include",
		})
		if (response.ok) {
			navigator("/")
		}
	}

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
	)
}

export default Login
