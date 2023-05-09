import "./utils/config.js"
import express from "express"
import cors from "cors"
import multer from "multer"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { getDb } from "./utils/db.js"

const server = express()
const PORT = process.env.PORT

// * ===== BODY PARSER ======
// enabling cors
server.use(cors({ origin: true, credentials: true }))
// for JSON
server.use(express.json())
// for cookies
server.use(cookieParser())
// for files and form fields add multer

//* ====== ROUTES ======

// room for routes
server.get("/", (req, res) => {
	res.send("Hello,world")
})

server.post("/register", async (req, res) => {
	const db = await getDb()
	const { username, password, email, agreedToTnC } = req.body
	const result = await db.collection("finco").insertOne(req.body)
	res.json(result)
})

// * ===== LOGGER ======
server.use(morgan("dev"))

// * ===== SERVER ======
server.listen(PORT, () => console.log("I am listening to PORT:", PORT))
