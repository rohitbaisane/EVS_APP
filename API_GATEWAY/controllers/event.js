
const asyncHandler = require("../utils/asyncHandler");
const {
    getRequest,
    postRequest,
    deleteRequest,
    patchRequest,
} = require("../service/httprequest");


const createEvent = asyncHandler(async (req, res) => {
    const bodyData = { ...req.body, createdBy: req.userId };
    const { userId } = req;
    console.log(userId);
    const eventRecord = await postRequest(`/api/event`, bodyData, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(eventRecord);
});

const getEvent = asyncHandler(async (req, res) => {
    const { params, userId } = req;
    console.log("middle server log");
    console.log(params);
    const eventRecord = await getRequest(`/api/event/${params.id}`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(eventRecord);
});

const getAllEvents = asyncHandler(async (req, res) => {
    const { userId } = req;
    const eventRecords = await getRequest(`/api/event`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(eventRecords);
})

const updateEvent = asyncHandler(async (req, res) => {
    const { body, params, userId } = req;
    const eventRecord = await patchRequest(`/api/event/${params.id}`, body, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(eventRecord);
});

const deleteEvent = asyncHandler(async (req, res) => {
    const { params, userId } = req;
    const eventRecord = await deleteRequest(`/api/event/${params.id}`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(eventRecord);
});

const getInvitationsList = asyncHandler(async (req, res) => {
    const { userId } = req;
    console.log(userId);
    const eventRecords = await getRequest(`/api/event/invitationlist`, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(eventRecords);
});
const updateInviteStatus = asyncHandler(async (req, res) => {
    const { body, userId } = req;
    const response = await postRequest('/api/event/invite', body, {
        userId,
        userAgent: req.headers['user-agent'],
        remoteIp: req.socket.remoteAddress,
    });
    return res.SEND(response);
});
module.exports = {
    createEvent,
    getEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    updateInviteStatus,
    getInvitationsList,
}