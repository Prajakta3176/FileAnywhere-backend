import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import conn from './connection/conn.js';
import fileRouter from "./routes/file.js";
dotenv.config();


conn();
const server = express();
server.use(cors());
server.use(express.json());



server.get("/",(req,res)=>{
    res.send("Hello World!");
})

server.use('/uploads', express.static('uploads'));
server.use("/api/user", userRouter);
server.use("/api/file", fileRouter);

server.listen(process.env.PORT , ()=>{
    console.log("server is running on port: ", process.env.PORT);
})