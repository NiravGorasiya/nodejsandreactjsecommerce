const { userLogin, userRegister, userChangePassword, useremailsend, userResetpassword, updateUserProfile } = require("../controller/UserController");
const User = require("../Models/User");
const router = require("express").Router()
const { isvalidateToken } = require("../util/User")

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/changePassword", isvalidateToken, userChangePassword)
router.post("/emailsend", useremailsend)
router.post("/resetpassword", userResetpassword)
router.put("/userprofileupdate", isvalidateToken, updateUserProfile)
module.exports = router;    