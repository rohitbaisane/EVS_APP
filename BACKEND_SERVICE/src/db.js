const { MONGO_URL } = require("./config/serverConfig");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);


const connect = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("Database is connected TO THIS URL" + MONGO_URL);
};

connect();