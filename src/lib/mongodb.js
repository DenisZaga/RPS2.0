'use server'
import mongoose from "mongoose";

const connectMongoDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected to mongoDB');
    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;

// import mongoose from "mongoose"

// const connection = {};

// export const connectMongoDB = async () => {
//   try {
//     if(connection.isConnected) {
//       console.log("Using existing connection");
//       return;
//     }
//     const db = await mongoose.connect(process.env.MONGODB_URL);
//     connection.isConnected = db.connections[0].readyState;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };