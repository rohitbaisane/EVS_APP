const validator = require("validator");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
        select: false,
    },

}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema, "users");
module.exports = userModel;