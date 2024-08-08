import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/mongoDB.js";
import route from "./routes/user.authRoute.js";
import cors from "cors";
dotenv.config();
const app = express();

const port = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [process.env.CLIENT_URL],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

//Route Definition
app.use("/api/auth", route);

//Database Connection
connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`server running on ${port}`);
        });
        console.log("database Connected...");
    })
    .catch((error) => {
        console.log(error);
    });