
const nodemailer = require('nodemailer');

module.exports.sendEmail = (data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'niravgorasiya10@gmail.com',
            pass: 'ninfsndwlqegsmla',
        }
    });

    const mailOptions = {
        from: "niravgorasiya10@gmail.com",
        to: data.to,
        subject: "otp for authentication" + data.otpcode,
        text: "You are receiving this email." +
            "Your otp is " +
            data.text +
            "\n\n",

    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log("mail sent");
    })
};