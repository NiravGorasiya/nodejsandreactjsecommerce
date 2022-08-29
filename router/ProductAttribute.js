const Product_attribute = require("../Models/Product_attribute")

const router = require("express").Router()

router.post("/", async (req, res, next) => {
    try {
        const productAttribute = new Product_attribute(req.body)
        const result = await productAttribute.save()
        res.status(201).json({ message: result })
    } catch (error) {

    }
})

module.exports = router