const asyncHandler = require("../utils/asyncHandler");

const populateSuccessResponse = (data) => {
    return {
        success: true,
        message: "Operation succeeded",
        data,
        error: {},
    }
};

const populateFailureResponse = (error) => {
    return {
        success: false,
        message: "Operation failed",
        data: {},
        error: error.message,
    }
};

const responses = asyncHandler(async (req, res, next) => {
    res.SEND = (response) => {
        const { statusCode, body } = response;
        return res.status(statusCode).json(body);
    }

    res.CREATED = (data) => {
        const resBody = populateSuccessResponse(data);
        return res.status(201).json(resBody);
    }

    res.BADREQUEST = (error) => {
        const resBody = populateFailureResponse(error);
        return res.status(400).json(resBody);
    }

    res.APPERROR = (error) => {
        const resBody = populateFailureResponse(error);
        return res.status(500).json(resBody);
    }
    next();
});;

module.exports = responses;