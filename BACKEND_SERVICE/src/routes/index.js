const express = require("express");
const router = express.Router();

const eventRoutes = require("./event");
const userRoutes = require("./user");

router.use('/', eventRoutes);
router.use('/', userRoutes);

module.exports = router;