const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); // Path to your Swagger specification file

// to have access the process.env
dotenv.config();


function appFunction(database) {

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
      if (!database.db) throw new Error('Database connection is unhealthy.')

      const db = await database.db.admin().ping();

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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  return app
}

module.exports = appFunction;
