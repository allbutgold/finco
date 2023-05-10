import { ObjectId } from "mongodb";
import { getDb } from "../utils/db.js";

const COL = "finco";
export const addTransaction = async (req, res) => {
	const userID = req.userClaims.sub;
	const transaction = req.body;
	try {
		const db = await getDb();
		const response = await db
			.collection(COL)
			.findOneAndUpdate(
				{ _id: new ObjectId(userID) },
				{ $push: { transactions: transaction } },
				{ returnDocument: "after" }
			);
		console.log(response.value);
		res.status(200).send("Added transaction successsfully");
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};
