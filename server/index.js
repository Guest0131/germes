import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import parsersRoute from './routes/parsers.js'

// Start config
const app = express()
dotenv.config()

// Constants
const PORT = process.env.APP_PORT || 3002


// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())

// Routes
// http://localhost:{PORT}/
app.use('/api/parsers', parsersRoute)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
