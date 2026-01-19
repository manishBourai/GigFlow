import express from "express"
import db from "./config/db.js";
import authRoute from "./routes/auth.routes.js"
import gigRoute from "./routes/gig.routes.js"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";

dotenv.config()
const PORT= process.env.PORT

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://gigflow-iota.vercel.app",
    "http://ec2-98-83-42-149.compute-1.amazonaws.com:5173",
    "http://ec2-98-83-42-149.compute-1.amazonaws.com"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded())

db();

app.get("/",(req,res)=>{
    res.json({
        message:"Server is runnign "
    })
})
app.use("/api/auth", authRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/users", userRoutes);


app.listen(PORT, () => console.log("Server running on port ",PORT));
