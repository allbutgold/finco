import { ObjectId } from "mongodb";
import { getDb } from "../utils/db.js";

const COL = "finco";

export const getCardInfo = async (req, res) => {
	const id = req.query.id;
	console.log(id);
	try {
		const db = await getDb();
		const result = await db.collection(COL).findOne({ _id: new ObjectId(id) });
		if (result === null) {
			throw new Error("Could not find user");
		} else {
			res.status(200).json(result.account.card).toString();
		}
		console.log(result);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Could not get data!" });
	}
};
