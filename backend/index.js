import express from 'express'
const app = express();
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'

app.use(cookieParser());
app.use(cors({
    origin: "https://taskify-wine.vercel.app",
    credentials: true,
}))
app.use(express.json())
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter);
app.get("/test-cookie", (req, res) => {
    console.log(req.cookies);
    res.json({ cookies: req.cookies });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));