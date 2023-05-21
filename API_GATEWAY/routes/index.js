const express = require("express");
const router = express.Router();

const eventRoutes = require("./event");
const userRoutes = require("./user");
const fileUploadRoutes = require("./fileUpload");

router.use('/', fileUploadRoutes);
router.use('/event', eventRoutes);
router.use('/user', userRoutes);

module.exports = router;