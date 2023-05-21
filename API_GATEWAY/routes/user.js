const express = require("express");
const router = express.Router();


const { UserController } = require("../controllers/index");

const isValidUser = require("../middlewares/auth");

router.get("/me", isValidUser, UserController.getUser);
router.post("/resetpassword", UserController.resetPasswordRequest);
router.post("/changepassword", UserController.changePassword);
router.post("/", UserController.signUp);
router.post("/signin", UserController.signIn);
router.patch("/me", isValidUser, UserController.updateUser);
router.delete("/me", isValidUser, UserController.deleteUser);
router.get("/", isValidUser, UserController.getAllUsers);

module.exports = router;