const ErrorResponse = require("../utils/error")

const checkMandatoryFields = (data, mandatoryfields) => {
    for (let i = 0; i < mandatoryfields.length; i++) {
        if (!data[mandatoryfields[i]])
            throw new ErrorResponse("Mandatory fields are missing", 400);
    }
}

module.exports = {
    checkMandatoryFields,
};