const asyncHandler = require("../utils/asyncHandler");
//const publishMessage = require("../service/publish");

const customeLogger = require("../service/logger");

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

const populateMessage = (req, responseData, event) => {
    const obj = {
        event,
        user: req.user,
        reqData: { ...req.params, ...req.body },
        resData: responseData,
        origin: {
            userAgent: req.headers.useragent,
            remoteIp: req.headers.remoteip,
        }
    };
    return obj;
};
const responses = asyncHandler(async (req, res, next) => {
    res.OK = (data, eventName) => {
        const resBody = populateSuccessResponse(data);
        const message = populateMessage(req, data, eventName);
        //   publishMessage(message);
        customeLogger.log('info', 'OPERATION SUCCEEDED');
        return res.status(200).json(resBody);
    };

    res.CREATED = (data, eventName) => {
        const resBody = populateSuccessResponse(data);
        const message = populateMessage(req, data, eventName);
        // publishMessage(message);
        customeLogger.log('info', 'OPERATION SUCCEEDED');
        return res.status(201).json(resBody);
    }

    res.BADREQUEST = (error, eventName) => {
        const resBody = populateFailureResponse(error);
        const message = populateMessage(req, error, eventName);
        //  publishMessage(message);
        customeLogger.log('error', 'BAD REQUEST FROM CLIENT');
        return res.status(400).json(resBody);
    }

    res.APPERROR = (error, eventName) => {
        const resBody = populateFailureResponse(error);
        const message = populateMessage(req, error, eventName);
        customeLogger.log('error', 'INTERNAL ERROR');
        //  publishMessage(message);
        return res.status(500).json(resBody);
    }
    next();
});;

module.exports = responses;