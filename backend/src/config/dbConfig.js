import mongoose from "mongoose";
import { MONGO_DB_URL } from "./serverConfig.js";

export const connectDb = async()=>{
    try{
       await mongoose.connect(MONGO_DB_URL);
       console.log("Connected to MongoDB");
    }
    catch(err){
        console.log("Error in connectDb", err);
        throw new Error(err);
    }
}