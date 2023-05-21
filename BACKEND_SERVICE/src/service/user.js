const User = require("../models/user");
const Token = require("../models/token");

const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const ErrorResponse = require("../utils/error");

const sendGmail = require("./sendMail");

const jwt = require("jsonwebtoken");
const ErrorCodes = require("../utils/statusCodes");

const { JWT_SECREATE } = require("../config/serverConfig");

const createUser = async (data) => {

    const hashedPassword = hashPassword(data.password);
    data.password = hashedPassword;
    const userRecord = await User.create(data);
    return userRecord;
}

const signIn = async (data) => {
    const { email, password } = data;
    const userRecord = await getUserByEmail(email);
    if (!userRecord) {
        throw new ErrorResponse(
            "Email id  is wrong",
            ErrorCodes.BAD_REQUESET,
        );
    }
    if (!bcrypt.compareSync(password, userRecord.password)) {
        throw new ErrorResponse(
            "Password is wrong",
            ErrorCodes.BAD_REQUESET,
        );
    }
    const token = createJwtToken(userRecord);
    return token;
}

const getUser = async (userId) => {
    const userRecord = await User.findById(userId);
    return userRecord;
}

// UPDATE USER BY ID -> /user/:id
const updateUser = async (userId, data) => {
    const userRecord = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
    return userRecord;
}

// DELETE USER BY ID -> /user/:id
const deleteUser = async (userId) => {
    const userRecord = await User.findByIdAndRemove(userId);
    return userRecord;
}


const getAllUsers = async () => {

    const usersRecords = await User.find().select("-password");
    return usersRecords;
}
const resetPasswordRequest = async (email) => {
    const userRecord = await getUserByEmail(email);
    const userId = userRecord._id;
    const tokenRecord = await Token.findOne({ userId });

    if (tokenRecord)
        await tokenRecord.deleteOne();

    const resetToken = crypto.randomBytes(32).toString("hex");

    await Token.create({
        token: resetToken,
        userId
    });

    const resetLink = `http://localhost:3000/changepassword?token=${resetToken}&userId=${userId}`;

    sendGmail(resetLink, email).then((response) => {
        console.log("Email is sent successfully");
    });
    return true;
}

const changePassword = async (token, userId, newPassword) => {
    const tokenRecord = await Token.findOne({ token });
    if (!tokenRecord) {
        throw new ErrorResponse(
            "Invalid reset token",
            ClientErrorCodes.BAD_REQUESET);
    }
    newPassword = bcrypt.hashSync(newPassword, 8);
    const userRecord = await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true, runValidators: true });
    return userRecord;

}

async function getUserByEmail(email) {

    const userRecord = await User.findOne({ email }).select("+password");
    if (!userRecord) {
        throw new ErrorResponse(
            "Email id is wrong",
            ErrorCodes.BAD_REQUESET,
        );
    }
    return userRecord;
}



function createJwtToken(user) {
    const token = jwt.sign({ id: user._id }, JWT_SECREATE, { expiresIn: "8h" });
    return token;
}

function hashPassword(plainText) {

    const hashedPassword = bcrypt.hashSync(plainText, 8);
    return hashedPassword;

}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn,
    getUserByEmail,
    resetPasswordRequest,
    changePassword,
    getAllUsers,
};