import express from 'express'
const app = express();
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'
import { JWT_SECRET } from './config/config.js'

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend domain
    credentials: true, // Allow cookies & authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allow these headers
}))
app.use(express.json())
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter);
app.get("/test-cookie", (req, res) => {
    console.log(req.cookies);  // Debugging
    res.json({ cookies: req.cookies });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));