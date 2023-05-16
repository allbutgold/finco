import { getDb } from "../utils/db.js";
import { createToken } from "../utils/create-token.utils.js";
import { ObjectId } from "mongodb";
// import { isValidEmail, isValidPassword } from "../utils/helper.js";

function isValidPassword(password) {
  // Implement your own password validation logic
  // For example, you can check for minimum length or specific character requirements
  if (password.length < 8) {
      return false;
  }
  return true;
}
function isValidEmail(email) {
  // Use a regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const register = async (req, res) => {
  try {
    const db = await getDb();
    const { email, password } = req.body;
    console.log(req.body);

    // Email validation
    if (!isValidEmail(email)) {
      res.status(400).send("Invalid email format");
      return;
    }

    // Password validation
    if (!isValidPassword(password)) {
      res.status(400).send("Invalid password");
      return;
    }

    if (await check(email)) {
      await db.collection("finco").insertOne(req.body);
      res.status(200).send("Successfully registered");
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).send("Internal server error");
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
		res.status(200).json({
			id: foundUser._id,
			user: foundUser.account.username,
			pic: foundUser.account.profileImage,
		});
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


export const getAllAccountData = async (req, res) => {
	const userID = req.query.id;
	try {
		const db = await getDb();
		const result = await db
			.collection('finco')
			.findOne({ _id: new ObjectId(userID) });
		if (result === null) {
			throw new Error("Could not find user");
		} else {
			res.status(200).json(result.account).toString();
		}
		console.log(result);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Could not get data!" });
	}
};

export default {
	register,
	login,
	auth,
  getAllAccountData
};
