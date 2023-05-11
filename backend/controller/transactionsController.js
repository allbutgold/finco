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
				{ $push: { [`transactions.${transaction.date}`]: transaction } },
				{ returnDocument: "after" }
			);
		// console.log(response.value);
		res.status(200).send("Added transaction successsfully");
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};

export const getAllTransactions = async (req, res) => {
	const userID = req.query.id;
	console.log(userID);
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(userID) });
		if (result === null) {
			throw new Error("Could not find user");
		} else {
			res.status(200).json(result.transactions).toString();
		}
		console.log(result);
	} catch (error) {
		console.error(error);
		res.status(400).json({ message: "Could not get data!" });
	}
};

export const getTotalTransactions = async (req, res) => {
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(req.userClaims.sub) });
		const total = { income: 0, expense: 0 };
		Object.entries(result.transactions).forEach(([key, value]) => {
			value.forEach((transaction) => {
				transaction.type == "income"
					? (total.income += +transaction.amount)
					: (total.expense += +transaction.amount);
			});
		});
		res.status(200).json(total);
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};
