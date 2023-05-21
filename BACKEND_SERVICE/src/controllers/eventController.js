const { EventService } = require("../service/index");

const asyncHandler = require("../utils/asyncHandler");

const createEvent = asyncHandler(async (req, res) => {
    const params = { ...req.body, createdBy: req.userId };
    const eventRecord = await EventService.createEvent(params);
    return res.CREATED(eventRecord, 'CREATE_EVENT');
});

const getEvent = asyncHandler(async (req, res) => {
    const params = { ...req.params };
    const userId = req.userId;
    const eventRecord = await EventService.getEvent(params.id, userId);
    return res.CREATED(eventRecord, 'GET_EVENT');
});

const getAllEvents = asyncHandler(async (req, res) => {
    const params = req.query;
    const userId = req.userId;
    const eventRecords = await EventService.getAllEvents(params, userId);
    return res.OK(eventRecords);
})

const updateEvent = asyncHandler(async (req, res) => {
    const params = { ...req.body, ...req.params };
    const userId = req.userId;
    const eventRecord = await EventService.updateEvent(params.id, params, userId);
    return res.OK(eventRecord);
});

const deleteEvent = asyncHandler(async (req, res) => {
    const params = req.params;
    const userId = req.userId;
    const eventRecord = await EventService.deleteEvent(params.id, userId);
    return res.OK(eventRecord);
});

const getInvitationsList = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const eventRecords = await EventService.getInvitationsList(userId);
    return res.OK(eventRecords);
});
const updateInviteStatus = asyncHandler(async (req, res) => {
    const params = req.body;
    const userId = req.userId;
    const response = await EventService.updateInviteStatus(params, userId);
    return res.OK(response);
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