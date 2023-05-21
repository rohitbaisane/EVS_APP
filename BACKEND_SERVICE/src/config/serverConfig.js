
const dotenv = require("dotenv");


dotenv.config();

const { PORT, JWT_SECREATE, username, PASSWORD, MONGO_URL } = process.env;


module.exports = {
    PORT,
    JWT_SECREATE,
    username,
    PASSWORD,
    MONGO_URL
}