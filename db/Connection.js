const mongoose = require("mongoose")


mongoose.connect(process.env.MONGODBURl)
    .then((res) => {
        console.log("Successfull database connection");
    })
    .catch((err) => {
        console.log(err, "not database connection");
    })



