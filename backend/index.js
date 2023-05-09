
import './utils/config.js'
import express from "express";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import cookieParser from "cookie-parser";


const server = express();
const PORT = process.env.PORT;

// * ===== BODY PARSER ======
// enabling cors
server.use(cors({ origin: process.env.VITE_FRONTEND, credentials: true }));
// for JSON
server.use(express.json());
// for cookies
server.use(cookieParser());
// for files and form fields add multer

//* ====== ROUTES ======

// room for routes
server.get("/",(req,res)=>{res.send("Hello,world")})

// * ===== LOGGER ======
server.use(morgan("dev"));

// * ===== SERVER ======
server.listen(PORT, () => console.log("I am listening to PORT:", PORT));
