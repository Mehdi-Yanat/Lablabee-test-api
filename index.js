const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose')

// to have access the process.env
dotenv.config();

// setting port
const port =
  process.env.NODE_ENV === "production"
    ? process.env.APP_PORT_PROD || 3000
    : process.env.APP_PORT_DEV || 3500;

// connect database
require("./src/database/mongoose");

// parse request
app.use(express.json());

// enable cors
app.use(cors());

// check health server
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'Server is healthy.',
  });
});

// check health database
app.get('/health-database', async (req, res) => {
  try {
    // Execute a simple query to check the database health
    if (!mongoose.connection.db) throw new Error('Database connection is unhealthy.')

    const db = await mongoose.connection.db.admin().ping();

    if (db.ok)
      res.status(200).json({
        success: true,
        message: 'Database connection is healthy.',
      });
    else {
      throw new Error('Database connection is unhealthy.')
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// configure routers
const labsRouters = require("./src/routers/labs.routers");

app.use("/api/labs", labsRouters);

// listen app on a port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
