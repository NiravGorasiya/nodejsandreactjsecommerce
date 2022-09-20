const User = require("../Models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendEmail } = require("../helper/sendmail");
const { queryErrorRelatedResponse, successResponce, notExistResponse } = require("../util/SendResponse")

const userRegister = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return notExistResponse(req, res, "User email already exist")
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const { username, email, phone } = req.body
            const user = new User({
                username,
                email,
                phone,
                password: hash
            })
            const result = await user.save()
            return successResponce(req, res, result)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const userLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const checkPassword = bcrypt.compareSync(req.body.password, user.password);
            if (checkPassword) {
                const token = jwt.sign({ _id: user._id }, process.env.SECREATEKEY);
                return successResponce(req, res, token)
            } else {
                return notExistResponse(req, res, "Invalid credentials")
            }
        } else {
            return notExistResponse(req, res, "Invalid credentials")
        }
    } catch (error) {

    }
}

const userChangePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user._id })
        if (user) {
            const checkPassword = bcrypt.compareSync(req.body.oldPassword, user.password);
            if (checkPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.newPassword, salt);
                user.password = hash
                user.save();
                return successResponce(req, res, "password successfull update")
            } else {
                return notExistResponse(req, res, "old password not match")
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "server eroor" })
    }
}

const useremailsend = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            let otpcode = Math.floor((Math.random() * 10000) + 1)
            user.userOtp = otpcode;
            user.save();
            sendEmail({
                to: req.body.email,
                subject: otpcode,
                html: otpcode,
                text: otpcode
            })
            return successResponce(req, res, "Mail successfull send")
        } else {
            return notExistResponse(req, res, "User email not found")
        }
    } catch (error) {
        console.log(error, "error");
    }
}

const userResetpassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ userOtp: req.body.otp })
        if (user) {
            const checkPassword = bcrypt.compareSync(req.body.oldPassword, user.password);
            if (checkPassword) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.newPassword, salt);
                user.password = hash
                user.save();
                return successResponce(req, res, "password successfull reset")
            } else {
                return notExistResponse(req, res, "old password not match")
            }
        } else {
            return queryErrorRelatedResponse(req, res, 404, "user otp not found")
        }
    } catch (error) {
        console.log(error, "error");
        return res.status(501).json({ error: error })
    }
}


const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.user._id },
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname
            }
        )
        return successResponce(req, res, user)
    } catch (error) {

    }
}

module.exports = { userRegister, userLogin, userChangePassword, useremailsend, userResetpassword, updateUserProfile }                  