const express = require("express");
const router = express.Router();


const { UserController } = require("../controllers/index");

const extractHeaders = require("../middlewares/auth");

router.get("/user/me", extractHeaders, UserController.getUser);
router.post("/resetpassword", UserController.resetPasswordRequest);
router.post("/changepassword", UserController.changePassword);
router.post("/user", UserController.signUp);
router.post("/signin", UserController.signIn);
router.patch("/user/me", extractHeaders, UserController.updateUser);
router.delete("/user/me", extractHeaders, UserController.deleteUser);
router.get("/user", extractHeaders, UserController.getAllUsers);

module.exports = router;