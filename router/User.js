const { userLogin, userRegister, userChangePassword, useremailsend, userResetpassword } = require("../controller/UserController");
const User = require("../Models/User");
const router = require("express").Router()
const { isvalidateToken } = require("../util/User")
router.post("/", (req, res, next) => {
    try {
        const user = new User(req.body)

        res.send("hello")
    } catch (error) {

    }
})

router.post("/register", userRegister)
router.post("/login", userLogin)
router.post("/changePassword", isvalidateToken, userChangePassword)
router.post("/emailsend", useremailsend)
router.post("/resetpassword", userResetpassword)
module.exports = router;