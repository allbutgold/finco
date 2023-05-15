import "./utils/config.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { getDb } from "./utils/db.js";
import userController from "./controller/userController.js";
import { getAllAccountData } from "./controller/userController.js";
import {
	authMiddleware,
	encryptPassword,
} from "./middleware/authMiddleware.js";
import exp from "constants";
import { ObjectId } from "mongodb";
import { getCardInfo } from "./controller/cardController.js";
import {
	addTransaction,
	getAllTransactions,
	getTotalTransactions,
	getTotalTransactionsByMonth,
	setBudget,
	getTotalExpensesByMonth,
	getTypeTransactionsbyMonth,
} from "./controller/transactionsController.js";

const server = express();
const PORT = process.env.PORT;
const upload = multer({ dest: "./img" });

// * ===== BODY PARSER ======
// enabling cors
server.use(cors({ origin: true, credentials: true }));

// for JSON
server.use(express.json());
// for cookies
server.use(cookieParser());
// for files and form fields add multer
server.use("/img", express.static("./img"));

//* ====== ROUTES ======

// room for routes
server.get("/", (req, res) => {
	res.send("Hello,world");
});

// * get credit card info
server.get("/getAccountData", getCardInfo);
server.get("/getAllAccountData", getAllAccountData);



//* add transaction
server.post("/addTransaction", upload.none(), authMiddleware, addTransaction);

server.get("/getTotalTransactions", authMiddleware, getTotalTransactions);

server.get(
	"/getTotalTransactionsByMonth",
	authMiddleware,
	getTotalTransactionsByMonth
);

server.get("/transactions", authMiddleware, getTypeTransactionsbyMonth);

server.get("/getTotalExpensesByMonth", authMiddleware, getTotalExpensesByMonth);

server.post("/setBudget", authMiddleware, setBudget);

//* auth routes
server.post("/login", encryptPassword, userController.login);
server.get("/auth", authMiddleware, userController.auth);
server.post("/logout", (req, res) => {
	// Clear any authentication tokens or session information
	// For example, you can clear the token stored in cookies
	res.clearCookie("t0k3n").sendStatus(200);
});

server.post("/register", encryptPassword, async (req, res) => {
	const db = await getDb();
	const result = await db.collection("finco").insertOne(req.body);
	res.json(result);
});

server.post("/setup", upload.single("profileImage"), async (req, res) => {
	try {
		const { cardNumber, expDate, _id, budget } = req.body;
		// const { path } = req.file;
		// const { expDate } = req.body;
		// const { _id } = req.body;
		console.log(_id);
		const db = await getDb();
		const updateFields = {};
		if (cardNumber && cardNumber.length === 19) {
			updateFields["account.card.cardNumber"] = cardNumber;
		}
		if (expDate && new Date(expDate) > new Date()) {
			updateFields["account.card.expDate"] = expDate;
		}
		if (req.file) {
			updateFields["account.profileImage"] = req.file.path;
		}
		if (budget && parseFloat(budget) > 0) {
			updateFields["account.budget"] = parseFloat(budget);
		}
		const result = await db.collection("finco").findOneAndUpdate(
			{ _id: new ObjectId(_id) },
			{
				$set: {
					// "account.card.cardNumber": cardNumber,
					// "account.card.expDate": expDate,
					// "account.profileImage": path,
					// "account.budget": path,
					...updateFields,
				},
			},
			{ returnDocument: "after" }
		);

		res.status(200).json(result.value);
	} catch (err) {
		console.log(err);
		res.status(500).end();
	}
});

server.get("/getAllTransactions", getAllTransactions);

// * ===== LOGGER ======
server.use(morgan("dev"));

// * ===== SERVER ======
server.listen(PORT, () => console.log("I am listening to PORT:", PORT));
