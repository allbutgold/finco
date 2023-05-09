import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
	try {
		const token = extractTokenFromCookies(req)
		const userClaims = jwt.verify(token, process.env.JWT_SECRET)
		// speichern der userclaims im request, damit wir im nachfolgenden controller zugriff auf die userclaims, wie die userId, haben.
		req.userClaims = userClaims
		next()
	} catch (error) {
		res.status(401).end()
	}
}

const extractTokenFromCookies = (req) => {
	const [tokenStrategy, token] = req.cookies["t0k3n"].split(" ")
	// returnwert vom split: ["Bearer", "dsfhkajsfdhjk.fdsahkjfdsahjk"]
	if (tokenStrategy !== "Bearer" || !token) {
		throw new Error("No Tokenstrategy or no token")
	}

	return token
}
