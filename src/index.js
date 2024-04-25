                       //  METHOD 2 of DB connection

// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectionDB from "./db/index.js"

connectionDB()

dotenv.config(
    {
        path:"./env"
    }
)












//  METHOD 1 of conneting of data base and execution in same file.
/*
import express from "express"
const app = express()

( async ()=>{
    try {
      await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_NAME}`) 
      app.on("error",(error)=>{
        console.log("ERROR : ", error)
        throw error
      })
      app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port : ${process.env.PORT}`)
      })
    } catch (error) {
        console.error("ERROR :" , error)
        throw error
    }
})()
*/