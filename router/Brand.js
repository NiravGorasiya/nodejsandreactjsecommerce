const Brand = require("../Models/Brand")

const router = require("express").Router()

router.post("/", async (req, res, next) => {
    try {
        const brand = new Brand(req.body)
        const result = await brand.save();
        res.status(201).json({ message: "Brand successfull create ❤ " })
    } catch (error) {

    }
})

module.exports = router