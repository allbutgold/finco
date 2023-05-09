import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const Auth = () => {
	const [isLoading, setIsLoading] = useState(true)
	const navigator = useNavigate()

	// const URL = import.meta.env.VITE_BACKEND_URL

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:9999/auth", { credentials: "include" })
			if (response.ok) {
				setIsLoading(false)
				const user = await response.json()
				console.log(user);

				return
			}
			navigator("/login")
		})()
	}, [])

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	return (
		<>
			<Outlet />
		</>
	)
}

export default Auth
