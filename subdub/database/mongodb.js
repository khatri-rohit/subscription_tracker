import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    throw new Error('Please define the MONGODB_URI in enviornment variables inside .env<development/production>.local');
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`DB Connected Successfully in ${NODE_ENV} Mode`);
    } catch (error) {
        console.log('Error Connecting to database: ', error);
        process.exit(1);
    }
};

export default connectToDB;