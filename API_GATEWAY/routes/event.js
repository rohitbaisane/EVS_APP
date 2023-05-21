const express = require("express");
const router = express.Router();

const { EventController } = require("../controllers/index");

const isValidUser = require("../middlewares/auth");

router.post("/", isValidUser, EventController.createEvent);
router.delete("/:id", isValidUser, EventController.deleteEvent);
router.get("/invitationlist", isValidUser, EventController.getInvitationsList);
router.get("/:id", isValidUser, EventController.getEvent);
router.get("/", isValidUser, EventController.getAllEvents);
router.patch("/:id", isValidUser, EventController.updateEvent);
router.post("/invite", isValidUser, EventController.updateInviteStatus);

module.exports = router;