const User = require("../Models/User")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { sendEmail } = require("../helper/sendmail");

const userRegister = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(422).json({ message: "email already exist" })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.password,
                password: hash
            })
            const result = await user.save()
            return res.status(201).json({ message: "User register successfull", result })
        }
    } catch (error) {
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
                return res.status(200).json({ message: "Login successfull", token })
            } else {
                return res.status(422).json({ message: "password wrong" })
            }
        } else {
            return res.status(422).json({ message: "Invalild credential" })
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
                return res.status(200).json({ message: "password successfull update" })
            } else {
                return res.status(422).json({ error: "old password not match" })
            }
        }
    } catch (error) {
        console.log(error, "dda");
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
            res.status(200).json({ message: "message successfull send" })
        } else {
            return res.status(422).json({ message: "email id not found" })
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
                return res.status(200).json({ message: "password successfull reset" })
            } else {
                return res.status(422).json({ error: "old password not match" })
            }
        } else {
            return res.status(422).json({ message: "otp not found" })
        }
    } catch (error) {
        console.log(error, "error");
        return res.status(501).json({ error: error })
    }
}

module.exports = { userRegister, userLogin, userChangePassword, useremailsend, userResetpassword }                  