import express from "express";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from "cors";
import debug from "debug";
import dotenv from "dotenv";
dotenv.config();

import connectdb from "./config/mongoose-connection.js";
import userRouter from "./routes/userRouter.js";
import companyRouter from "./routes/companyRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";

const dbgr = debug("development:app");

const app = express();
const _dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
    origin : "https://hirebus-4mvb.onrender.com",
    credentials: true
}
app.use(cors(corsOption));

app.use("/api/user",userRouter);
app.use("/api/company",companyRouter);
app.use("/api/job",jobRouter);
app.use("/api/application",applicationRouter);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*' , (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend" , "dist", "index.html"));
});

app.listen(PORT,()=>{
    dbgr(`Server running at port ${PORT}`);
    connectdb();
});