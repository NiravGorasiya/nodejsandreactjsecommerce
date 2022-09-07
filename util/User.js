const User = require("../Models/User")

exports.isvalidateToken = async (req, res, next) => {
    try {
        const jwt = require("jsonwebtoken")
        const token = req.header("x-auth-token")
        if (!token) {
            return res.status(422).json({
                message: "token not found"
            })
        }
        const verified = jwt.verify(token, process.env.SECREATEKEY)
        const user = await User.findOne({ _id: verified._id })
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error);
    }
}
