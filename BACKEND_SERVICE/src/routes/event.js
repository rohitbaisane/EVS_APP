const express = require("express");
const router = express.Router();

const { EventController } = require("../controllers/index");

const extractHeaders = require("../middlewares/auth");

router.post("/event", extractHeaders, EventController.createEvent);
router.delete("/event/:id", extractHeaders, EventController.deleteEvent);
router.get("/event/invitationlist", extractHeaders, EventController.getInvitationsList);
router.get("/event", extractHeaders, EventController.getAllEvents);
router.get("/event/:id", extractHeaders, EventController.getEvent);
router.patch("/event/:id", extractHeaders, EventController.updateEvent);
router.post("/event/invite", extractHeaders, EventController.updateInviteStatus);

module.exports = router;