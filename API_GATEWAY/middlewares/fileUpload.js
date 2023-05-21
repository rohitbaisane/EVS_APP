const multer = require("multer");
const asyncHandler = require("../utils/asyncHandler");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets');
    },
    filename: function (req, file, cb) {
        console.log("This is my file");
        console.log(file);
        cb(null, file.originalname + " - " + req.userId.toString());
    }
})

const upload = multer({ storage });

module.exports = upload;
