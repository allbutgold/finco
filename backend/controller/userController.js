import { getDb } from "../utils/db.js";
import { createToken } from "../utils/create-token.utils.js";

const register = async (req, res) => {
	const db = await getDb();
	if (await check(req.body.email)) {
		await db.collection("finco").insertOne(req.body);
		res.end();
	} else {
		res.status(401).end();
	}
};

const login = async (req, res) => {
	try {
		const db = await getDb();
		const foundUser = await db.collection("finco").findOne({
			"account.email": req.body.account.email,
			"account.password": req.body.account.password,
		});
		if (!foundUser) {
			throw new Error("user not found, try again");
		}
		const token = createToken(foundUser._id, foundUser.role);
		res.cookie("t0k3n", token, {
			secure: true,
			httpOnly: true,
		});
		//*HAN
		res.status(200).json({
			id: foundUser._id,
			user: foundUser.account.username,
			pic: foundUser.account.profileImage,
		});
		//*HAN
	} catch (error) {
		console.log("userController-login: ", error);
		res.status(500).end();
	}
};

const auth = async (req, res) => {
	try {
		console.log("userClaims", req.userClaims);
		// const db = await getDB()
		// const sub = await db.collection("finco").findOne({ _id: req.userClaims.sub })
		res.status(200).json(req.userClaims.sub);
	} catch (error) {
		res.status(500).end();
	}
};

export default {
	register,
	login,
	auth,
};
