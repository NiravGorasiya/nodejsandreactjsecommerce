const Product_type = require('../Models/Product_type')

const router = require('express').Router()

router.post("/", async (req, res, next) => {
    try {
        const productType = new Product_type(req.body);
        const result = await productType.save()
        res.status(201).json(result)
    } catch (error) {

    }
})

module.exports = router