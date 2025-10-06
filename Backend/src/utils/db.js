import mongoose from "mongoose"
import config from "../config/config.js";
export const db =async()=>{
    try {
        await mongoose.connect(config.dbUri);
        console.log("mongodb Database connected");
        
    } catch (error) {
        console.log("Error connecting to mongodb:", error);

    }
} 