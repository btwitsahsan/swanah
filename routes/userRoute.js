const express = require("express");
const { registerUser, loginUser, logout, getUser, checkLoginStatus, updateUser, updatePhoto } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logout)
router.post("/getUser", protect, getUser)
router.patch("/updateUser", protect, updateUser)
router.patch("/updatePhoto", protect, updatePhoto)
router.post("/checkLoginStatus", checkLoginStatus)


module.exports = router;