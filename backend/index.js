import express from 'express'
const app = express();
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/admin.js'
import userRouter from './routes/user.js'
import { JWT_SECRET } from './config/config.js'

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));