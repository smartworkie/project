const express = require('express');

const connectDB = require('./db/dbConnection')
const dotenv = require('dotenv');

const router = require('./Routes/userRoutes');


dotenv.config()
const app = express()

app.use(express.json())

const PORT = process.env.PORT || 700;

connectDB()

app.listen(PORT, () =>{
    console.log(`Recipe Server Actively Functioning at ${PORT}`)
})
app.use('/api', router)