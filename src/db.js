import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(
        config.MONGO_URL
        );
        console.log("Conexión exitosa a la base de datos");
    } 
    catch (error) {
        console.error("Error al conectar a la base de datos", error);
    }
};

export default connectDB;