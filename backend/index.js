
import "./utils/config.js"
import express from "express"
import cors from "cors"
import multer from "multer"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { getDb } from "./utils/db.js"
import userController from "./controller/user.controller.js"
import { authMiddleware } from "./middleware/auth.middleware.js"
import exp from 'constants';
import { ObjectId } from 'mongodb';


const server = express()
const PORT = process.env.PORT
const upload = multer({ dest: './img' })


// * ===== BODY PARSER ======
// enabling cors
server.use(cors({ origin: true, credentials: true }))
// for JSON
server.use(express.json())
// for cookies
server.use(cookieParser())
// for files and form fields add multer
server.use('/img', express.static('./img'))

//* ====== ROUTES ======

// room for routes
server.get("/", (req, res) => {
	res.send("Hello,world")
})



server.post("/login", userController.login)
server.get("/auth", authMiddleware, userController.auth)

server.post('/register' , async (req,res)=> {
  const db = await getDb();   
  const result = await db.collection('finco').insertOne(req.body);
  res.json(result);
})

server.post('/setup', upload.single('profileImage'), async (req,res)=> {
  try {
    const { cardNumber } = req.body;
    const { path } = req.file;
    const { expDate } = req.body;
    const { _id } = req.body;
    console.log(_id)
    const db = await getDb()
    const result = await db.collection('finco').updateOne(
      { _id: new ObjectId(_id) },
      { $set: {
        'account.cardNumber': cardNumber,
        'account.expDate': expDate,
        'account.profileImage': path
      }}
    )
    console.log(result)
    res.json({message: 'success'})
  }catch(err) {
    console.log(err)
    res.status(500).end()
  }


// * ===== LOGGER ======
server.use(morgan("dev"))

// * ===== SERVER ======
server.listen(PORT, () => console.log("I am listening to PORT:", PORT))
