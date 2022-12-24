import express from  'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { register } from './controllers/auth';

import { authRoute } from './routes/auth';
import { postsRoute } from './routes/posts';

import { verifyToken } from './middleware/auth';


// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// Constants
const APP_PORT = process.env.APP_PORT || 3002;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

// Middleware
const app = express();
mongoose.set('strictQuery', true);
app.use(express.json());
app.use(helmet()); 
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// File Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });


// Routes
app.use('/api/auth',  authRoute);
app.use('/posts', postRoute)



// Start server and connect to DB
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