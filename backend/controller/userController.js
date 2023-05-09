import { getDB } from "../service/db.service.js"
import userService from "../service/user.service.js"
import { createToken } from "../utils/create-token.utils.js"

const login = async (req, res) => {
	try {
		const db = await getDB()
		const foundUser = await db.collection("user").findOne({ email: req.body.email, password: req.body.password })
		if (!foundUser) {
			throw new Error("user not found")
		}
		const token = createToken(foundUser._id, foundUser.role)
		res.cookie("t0k3n", token, {
			secure: true,
			httpOnly: true,
		})

		res.send("logged in")
	} catch (error) {
		console.log("userController-login: ", error)
		res.status(500).end()
	}
}

const auth = async (req, res) => {
	try {
		console.log("userClaims", req.userClaims)
		// const db = await getDB();
		// const products = await db.collection("products").findOne({_id: req.userClaims.sub})
		res.status(200).end()
	} catch (error) {
		res.status(500).end()
	}
}

export default {
	login,
	auth,
}
