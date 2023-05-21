const { FileUploadController } = require("../controllers/index");

const express = require("express");
const router = express.Router();

const isValidUser = require("../middlewares/auth");

const upload = require("../middlewares/fileUpload");

router.post("/fileupload", isValidUser, upload.array("images", 10), FileUploadController.uploadImage);

module.exports = router;