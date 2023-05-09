import jwt from "jsonwebtoken"

export const createToken = (userId, role) => {
	const JWT_SECRET = process.env.JWT_SECRET

	const payload = {
		sub: userId,
		// iat: Date.now() //optional
		role: role,
	}

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h", algorithm: "HS256" })

	return "Bearer " + token
}
