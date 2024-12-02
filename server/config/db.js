const mongoose = require('mongoose');
const dotenv = require('dotenv')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB at host: ${conn.connection.host}`);
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
