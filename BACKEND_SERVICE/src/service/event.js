const Event = require("../models/event");


const ErrorResponse = require("../utils/error");
const ErrorCodes = require("../utils/statusCodes");
const Utils = require("../utils/helper");

const createEvent = async (data) => {
    Utils.compareStartAndEndTime(data.startTime);
    const eventCode = await generateEventCode();
    data.code = eventCode;
    const eventRecord = await Event.create(data);
    return eventRecord;

};

const getAllEvents = async (filter, userId) => {
    let filterObj = { createdBy: userId };
    if (filter.name) {
        filterObj.name = { $regex: filter.name };
    }
    const eventRecords = await Event.find(filterObj)
        .populate('invitedUsers.user', 'name email');
    console.log("This is eventrecord");
    console.log(eventRecords);
    return eventRecords;
}


const getEvent = async (eventId, userId) => {
    console.log("This is running");
    console.log(eventId);
    const eventRecord = await Event.findOne({
        _id: eventId,
        createdBy: userId,
    });
    if (!eventRecord) {
        throw new ErrorResponse(
            "Event does not exist",
            ErrorCodes.BAD_REQUESET,
        );
    }
    return eventRecord;
}
const updateEvent = async (eventId, data, userId) => {
    const eventRecord = await Event.findOneAndUpdate(
        {
            _id: eventId,
            createdBy: userId
        },
        data,
        { new: true, runValidators: true });

    if (!eventRecord) {
        throw new ErrorResponse(
            "Event does not exist",
            ErrorCodes.BAD_REQUESET,
        );
    }
    return eventRecord;
};

const deleteEvent = async (eventId, userId) => {
    const eventRecord = await Event.findOneAndRemove({
        _id: eventId,
        createdBy: userId
    });

    if (!eventRecord) {
        throw new ErrorResponse(
            "Event does not exist",
            ErrorCodes.BAD_REQUESET,
        );
    }
    return eventRecord;

};

const getInvitationsList = async (userId) => {
    const eventRecords = await Event.find({ invitedUsers: { $elemMatch: { user: userId } } }).populate("createdBy invitedUsers.user", "name email");
    console.log(eventRecords);
    return eventRecords;
}
const updateInviteStatus = async (data, userId) => {

    const { code, status } = data;
    const eventRecord = await Event.findOne({ code });
    if (!eventRecord) {
        throw new ErrorResponse(
            "Event does not exist",
            ErrorCodes.BAD_REQUESET,
        );
    }
    const invitedUsersRecords = eventRecord.invitedUsers;
    let isInvited = false;
    for (let i = 0; i < invitedUsersRecords.length; i++) {
        const invitedUser = invitedUsersRecords[i];
        if (invitedUser.user.equals(userId)) {
            invitedUser.status = status;
            invitedUser.respondedTime = new Date();
            isInvited = true;
            break;
        }
    }
    if (isInvited == true) {
        await eventRecord.save();
        return eventRecord;
    }
    throw new ErrorResponse(
        "You are not invited to this event",
        ErrorCodes.BAD_REQUEST,
    );
};


async function generateEventCode() {
    const code = Utils.generateRandomCode(6);
    const eventRecord = await Event.findOne({ code });
    if (eventRecord) {
        return generateEventCode(length);
    }
    return code;
}
module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvents,
    getInvitationsList,
    updateInviteStatus,
}
