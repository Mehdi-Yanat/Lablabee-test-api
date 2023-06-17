const mongoose = require("mongoose");

const connectToDatabase = async () => {
    try {
        if (process.env.MONGODB_URL) {
            // connect to db
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("Connected to the database");
            return mongoose.connection; // Return the connection object
        } else {
            throw new Error("MONGODB_URL not found in environment variables");
        }
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
};


module.exports = connectToDatabase;
