const jwt = require("jsonwebtoken");

const ErrorCodes = require("../utils/statusCodes");
const ErrorResponse = require("../utils/error");

const { JWT_SECREATE } = require("../config/serverConfig");

const asyncHandler = require("../utils/asyncHandler");

const { getRequest } = require("../service/httprequest");

const isValidUser = asyncHandler(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        throw new ErrorResponse(
            "Token is missing",
            ErrorCodes.BAD_REQUESET
        );
    }
    const object = jwt.verify(token, JWT_SECREATE);
    console.log(object);
    const response = await getRequest(`/api/user/me`, { userId: object.id });
    const userRecord = response.body.data;
    console.log(userRecord);
    if (!userRecord) {
        throw new ErrorResponse(
            "No user exist for corrosponding token",
            ErrorCodes.BAD_REQUESET
        );
    }
    req.user = userRecord;
    req.userId = userRecord._id;
    next();
});

module.exports = isValidUser;
