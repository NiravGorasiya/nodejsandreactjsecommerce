const Color = require("../Models/Color")
const Product = require("../Models/Product.");
const Size = require("../Models/Size");

const router = require("express").Router()


router.post("/", async (req, res, next) => {
    try {
        const product = new Product(req.body);
        // let color = req.body.colors.split(",")
        // const colorList = []
        // let promise = color.map(async (item) => {
        //     const isExist = await Color.findOne({ colorname: item })
        //     if (!isExist)
        //         colorList.push({ colorname: item })
        // })
        // await Promise.all(promise);
        // if (colorList) Color.insertMany(colorList)
        // const sizeList = []
        // const size = req.body.sizes.split(",")
        // let sizeresponse = size.map(async (item) => {
        //     const isExist = await Size.findOne({ sizename: item })
        //     if (!isExist)
        //         sizeList.push({ sizename: item })
        // })
        // await Promise.all(sizeresponse)
        // if (sizeList) Size.insertMany(sizeList)
        const result = product.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error, "erro");
        res.send(error)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const product = await Product.find({
            "review.name": "nirav"
        });
        res.status(200).json(product)
    } catch (error) {

    }
})
module.exports = router

