const mongoose = require('mongoose');


const connectDB = async() => {
     try{ 
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Hurray! Database Connected")
     }
     catch(error) {
        console.log(`Connection Error{ ${error}`)
     }
}

module.exports = connectDB;
