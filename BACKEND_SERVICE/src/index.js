const express = require("express");
const app = express();

require("./db");
require("./service/cron");

const errorHandler = require("./middlewares/errorHandler");
const responses = require("./middlewares/response");

const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");


// prepare and start the starver.
const prepareAndStartServer = async (req, res) => {

    //parser the incoming json and url-encoded data.
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", responses);
    app.use("/api", apiRoutes);
    app.use("/api", errorHandler);
    app.listen(5000, () => {
        console.log("Server is listening");
    })

};

prepareAndStartServer();