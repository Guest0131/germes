import express from  'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
dotenv.config();
mongoose.set('strictQuery', true);

// Constants
const APP_PORT = process.env.APP_PORT || 3002;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'All is fine'
    })
});


async function start () {
    try {
        await mongoose.connect(
            `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
            { useNewUrlParser: true }
            );

        app.listen(APP_PORT, () => console.log(`Server started on port: ${APP_PORT}`))
    } catch (err) {
        console.log("Error connecting to MongoDB: ", err);
    }
}

start();