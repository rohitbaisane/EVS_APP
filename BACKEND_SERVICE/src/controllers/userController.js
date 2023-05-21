const { UserService } = require("../service/index");

const asyncHandler = require("../utils/asyncHandler");

const getUser = asyncHandler(async (req, res) => {
    const id = req.userId;
    const userRecord = await UserService.getUser(id);
    return res.OK(userRecord, 'FETCHED A PROFILE');
});

const getAllUsers = asyncHandler(async (req, res) => {
    const userRecord = await UserService.getAllUsers();
    return res.OK(userRecord, 'FETCHED ALL PROFILES');
});

const signIn = asyncHandler(async (req, res) => {
    const params = { ...req.body };
    const response = await UserService.signIn(params);
    return res.OK(response, 'USER LOGGEDIN');
});

const signUp = asyncHandler(async (req, res) => {
    const params = { ...req.body };
    const userRecord = await UserService.createUser(params);
    return res.OK(userRecord, 'USER CREATED');
});

const updateUser = asyncHandler(async (req, res) => {
    const params = { ...req.body };
    const id = req.userId;
    const userRecord = await UserService.updateUser(id, params);
    return res.OK(userRecord, 'UPDATED A PROFILE');
});

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.userId;
    const userRecord = await UserService.deleteUser(id);
    return res.OK(userRecord, 'DELETED AN ACTIVITY');
});

const resetPasswordRequest = asyncHandler(async (req, res) => {
    const params = { ...req.body };
    const response = await UserService.resetPasswordRequest(params.email);
    return res.OK(response, 'MADE REQUEST FOR CHANGING PASSWORD');
});

const changePassword = asyncHandler(async (req, res) => {
    const params = { ...req.query, ...req.body };
    const response = await UserService.changePassword(params.token, params.userId, params.password);
    return res.OK(response, 'CHANGED PASSWORD');
});


module.exports = {
    getUser,
    signUp,
    updateUser,
    deleteUser,
    signIn,
    resetPasswordRequest,
    changePassword,
    getAllUsers,
}