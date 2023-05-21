
const { UserService } = require("../service/index");

const ErrorCodes = require("../utils/statusCodes");
const ErrorResponse = require("../utils/error");

const asyncHandler = require("../utils/asyncHandler");


const extractHeaders = asyncHandler(async (req, res, next) => {
    const userId = req.headers['userid'];
    if (!userId) {
        throw new ErrorResponse("header for userid is missing", ErrorCodes.BAD_REQUESET);
    }
    req.userId = userId;
    next();
});

module.exports = extractHeaders;
