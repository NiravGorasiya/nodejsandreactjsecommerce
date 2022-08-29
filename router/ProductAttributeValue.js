const ProductAttributeValue = require("../Models/Product_attribute_value")

const router = require("express").Router()

router.post("/", async (req, res, next) => {
    try {
        const productAttributeValue = new ProductAttributeValue(req.body)
        const result = await productAttributeValue.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(500)
    }
})

module.exports = router