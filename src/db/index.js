import mongoose from "mongoose"

import { DB_NAME } from "../constants.js"

const connectionDB = async () =>{
    try {
      const connectionInstance =   await mongoose.connect(`${process.env.MONGOODB_URI}/${DB_NAME}`)
      console.log(`MongooDB connected !! DB Host :" ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Data base connection error :" , error)
        process.exit(1);
        
    }
}

export default connectionDB