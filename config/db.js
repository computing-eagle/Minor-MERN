import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongourl);
        console.log(`Connected to Mongo ${conn.connection.host}`.bgMagenta.white);
    }
    catch(error){
        console.log(`Error in MongoDb ${error}`.bgRed.white);
    }    
};

export default connectDB;