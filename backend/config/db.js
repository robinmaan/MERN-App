import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connection mongo : ${conn.connection.host}`);

    } catch (error) {
      console.error(`error message: ${error.message}`);  
      process.exit(1)
    }
}