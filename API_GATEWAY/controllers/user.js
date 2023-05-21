
const { checkMandatoryFields } = require("../service/common");
const asyncHandler = require("../utils/asyncHandler");

const {
    getRequest,
    postRequest,
    deleteRequest,
    patchRequest,
} = require("../service/httprequest");

const getUser = asyncHandler(async (req, res) => {
    const { userId } = req;
    const userRecord = await getRequest(`/api/user/me`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(userRecord);
});

const getAllUsers = asyncHandler(async (req, res) => {

    const { userId } = req;
    const usersRecords = await getRequest(`/api/user/`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(usersRecords);
});
const signIn = asyncHandler(async (req, res) => {
    const { body } = req;
    const userRecord = await postRequest(`/api/signin`, body, {
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress
    });
    return res.SEND(userRecord);
});

const signUp = asyncHandler(async (req, res) => {
    const { body } = req;
    checkMandatoryFields(body, ['name', 'email', 'password']);
    const userRecord = await postRequest(`/api/user`, body, {
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress
    });
    return res.SEND(userRecord);
});

const updateUser = asyncHandler(async (req, res) => {
    const { body, userId } = req;
    const userRecord = await patchRequest(`/api/user/me`, body, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(userRecord);
});

const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req;
    const userRecord = await deleteRequest(`/api/user/me`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(userRecord);
});

const resetPasswordRequest = asyncHandler(async (req, res) => {
    const { body } = req;
    checkMandatoryFields(body, ['email']);
    const response = await postRequest(`/api/resetpassword`, body, {
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(response);
});

const changePassword = asyncHandler(async (req, res) => {
    const { body, query } = req;
    checkMandatoryFields({ ...body, ...query }, ['token', 'userId', 'password']);
    const response = await postRequest(`/api/changepassword?token=${query.token}&userId=${query.userId}`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(response);
});


module.exports = {
    getUser,
    signUp,
    updateUser,
    deleteUser,
    signIn,
    resetPasswordRequest,
    changePassword,
    getAllUsers
}