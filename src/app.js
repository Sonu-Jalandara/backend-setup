import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true
}))

// app.use()-- it is method to include middlewares in expressJS application.
  
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// importing routes
 
import userRoute from "./routes/user.routes.js"

// routes declaration 
app.use("/api/v1/users", userRoute)
export { app }