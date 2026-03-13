import express from "express";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/userRoutes.js";
import cors from 'cors'




const app = express();

app.use(cors({
    origin:'https://todo-app-isti.vercel.app',
    credentials:true
}))

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/user", UserRoutes);

export default app;