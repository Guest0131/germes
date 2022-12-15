import express from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

// Constants
const APP_PORT = process.env.APP_PORT || 3002;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;


async function start () {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
            );
        console.log(`Server started on port: ${APP_PORT}`);
    } catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
}

start();