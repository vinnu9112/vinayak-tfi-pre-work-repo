import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoute from './routes/authRoutes.js'
import cors from 'cors'

dotenv.config()

connectDB();

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use(`/api/v1/auth`, authRoute)

app.get('/', (req, res)=>{
    res.send("Hello")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`.bgCyan.white);
})