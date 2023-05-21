const ErrorResponse = require("./error");
const ErrorCodes = require("./statusCodes");

const Event = require("../models/event");

function generateRandomCode(length) {
    const randomString = "ABCDEFJHIJKLMNOPQRSTUVWXYZ";
    const generatedString = [];
    for (let i = 0; i < length; i++) {
        const indice = Math.floor(Math.random() * (25 - 0 + 1) + 0);
        const randomCharacter = randomString[indice];
        generatedString.push(randomCharacter);
    }
    const myString = generatedString.join("");
    return myString;
};

function compareStartAndEndTime(startTime, endTime) {
    const t1 = new Date(startTime).getTime();
    const t2 = new Date(endTime).getTime();

    const currTime = new Date().getTime();

    if (t1 >= t2) {
        console.log("starttime:  " + t1);
        console.log("endtime:  " + t2);
        throw new ErrorResponse(
            "start time cannot be greater than end time",
            ErrorCodes.BAD_REQUESET,);
    }

    if (t1 <= currTime) {
        throw new ErrorResponse(
            "start time cannot be less than current time",
            ErrorCodes.BAD_REQUESET,);
    }


}
module.exports = {
    generateRandomCode,
    compareStartAndEndTime,
};