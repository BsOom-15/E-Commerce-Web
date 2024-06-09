import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected Successfuly :) ");
    }
    catch(error){
        console.error(`ERROR: ${error.message}`);
    }
}

export default connectDB;