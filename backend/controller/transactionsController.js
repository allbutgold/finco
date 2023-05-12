import { ObjectId } from "mongodb";
import { getDb } from "../utils/db.js";
import { getCurrentMonthStart, getCurrentMonthEnd } from "../utils/helper.js";

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

export const getTotalTransactionsByMonth = async (req, res) => {
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(req.userClaims.sub) });

		const currentMonthStart = getCurrentMonthStart();
		const currentMonthEnd = getCurrentMonthEnd();

		let totalIncome = 0;
		let totalExpense = 0;
		Object.entries(result.transactions).forEach(([key, value]) => {
			value.forEach((transaction) => {
				const transactionDate = new Date(transaction.date);
				if (
					transactionDate >= currentMonthStart &&
					transactionDate <= currentMonthEnd
				) {
					if (transaction.type === "income") {
						totalIncome += +transaction.amount;
					} else if (transaction.type === "expense") {
						totalExpense += +transaction.amount;
					}
				}
			});
		});

		const total = totalIncome - totalExpense;
		res.status(200).json(total);
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};

export const setBudget = async (req, res) => {
	const userID = req.query.id; // Assuming the user ID is passed as a query parameter
	const { budget } = req.body; // Extract the budget value from the request body
	console.log(budget);
	try {
		const db = await getDb();
		const response = await db.collection(COL).findOneAndUpdate(
			{ _id: new ObjectId(userID) },
			{ $set: { "account.budget": budget } }, // Update the budget field directly with the extracted value
			{ returnDocument: "after" }
		);
		res.status(200).json({ budget: budget });
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};

export const getTotalExpensesByMonth = async (req, res) => {
	try {
		const db = await getDb();
		const result = await db
			.collection(COL)
			.findOne({ _id: new ObjectId(req.userClaims.sub) });

		const currentMonthStart = getCurrentMonthStart();
		const currentMonthEnd = getCurrentMonthEnd();

		let totalExpense = 0;
		Object.entries(result.transactions).forEach(([key, value]) => {
			value.forEach((transaction) => {
				const transactionDate = new Date(transaction.date);
				if (
					transactionDate >= currentMonthStart &&
					transactionDate <= currentMonthEnd &&
					transaction.type === "expense"
				) {
					totalExpense += +transaction.amount;
				}
			});
		});

		res.status(200).json(totalExpense);
	} catch (error) {
		console.error(error);
		res.status(400).send("Something went wrong");
	}
};
