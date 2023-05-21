const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        maxlength: 6,
    },
    invitedUsers: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
            default: 'PENDING',
        },
        respondedTime: {
            type: Date,
            default: null,
        }
    }],
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
    startTime: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const eventModel = mongoose.model("Event", eventSchema, "events");
module.exports = eventModel;