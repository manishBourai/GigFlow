import express from "express"
import db from "./config/db.js";
import authRoute from "./routes/auth.routes.js"
import gigRoute from "./routes/gig.routes.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import { isLoggedIn } from "./middleware/auth.js";

dotenv.config()
const PORT= process.env.PORT

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded())

db();

app.use("/api/auth", authRoute);
app.use("/api/gigs",isLoggedIn, gigRoute);


app.listen(PORT, () => console.log("Server running on port ",PORT));
