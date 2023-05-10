import jwt from "jsonwebtoken"
import { createHmac } from "crypto"

export const encryptPassword = (req, _, next) => {
	const hmac = createHmac("sha256", req.body.account.password)
	req.body.account.password = hmac.digest("hex")
	next()
}

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
