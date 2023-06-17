// server.js
const makeApp = require("./index");
const connectToDatabase = require("./src/database/mongoose");

const port =
    process.env.NODE_ENV === "production"
        ? process.env.APP_PORT_PROD || 3000
        : process.env.APP_PORT_DEV || 3500;

connectToDatabase()
    .then((dbConnection) => {
        const app = makeApp(dbConnection);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
