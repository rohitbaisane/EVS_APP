const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 1000,// this is the expiry time in seconds
    },
});
const tokenModel = mongoose.model("Token", tokenSchema, "tokens");
module.exports = tokenModel; 