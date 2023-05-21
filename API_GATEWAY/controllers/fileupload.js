const ErrorResponse = require("../utils/error")

const asyncHandler = require("../utils/asyncHandler");

const uploadImage = asyncHandler(async (req, res) => {
    const images = req.files;
    const responseArray = [];
    for (let i = 0; i < images.length; i++) {
        const data = {
            name: images[i].originalname,
            path: images[i].path,
        };
        responseArray.push(data);
    }
    return res.CREATED(responseArray);

});

module.exports = { uploadImage };
