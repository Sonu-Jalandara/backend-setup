                       //  METHOD 2 of DB connection

// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"
import connectionDB from "./db/index.js"
// import express from "express"
// const app = express()
import {app} from "./app.js"

connectionDB()
.then(()=>{
  app.listen(process.env.PORT || 8000 ,()=>{
    console.log(`Server is listening at port : ${process.env.PORT}`)
  })
  // app.on(error,()=>{
  //   console.log("ERROR is found in app",error)
  // })
  app.on('error',()=>{
    console.log("ERROR is found in app",error)
  })
})
.catch((err)=>{
  console.log(" Mongo DB connection failed !! ", err)
})

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