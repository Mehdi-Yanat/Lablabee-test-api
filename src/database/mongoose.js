const mongoose = require("mongoose");

if (process.env.MONGODB_URL) mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connected to the database.');
}).catch((error) => {
    console.log('Database connection error:', error);
});
