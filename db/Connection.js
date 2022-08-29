const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/E-commerce")
    .then((res) => {
        console.log("Successfull database connection");
    })
    .catch((err) => {
        console.log("not database connection");
    })