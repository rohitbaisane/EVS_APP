const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const responses = require("./middlewares/response");

const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");

// prepare and start the starver.
const prepareAndStartServer = async (req, res) => {

    //parser the incoming json and url-encoded data.
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors({ origin: "*" }));
    app.use("/api", responses);
    app.use("/api", apiRoutes);
    app.use("/api", errorHandler);

    app.get("/healthcheck", (req, res) => {

        console.log("healtcheck is done ");
    });
    app.listen(PORT, () => {
        console.log("Server is listening");
    })

};

prepareAndStartServer();