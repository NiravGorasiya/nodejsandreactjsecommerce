const Size = require("../Models/Size")

const router = require("express").Router()

router.post("/", async (req, res, next) => {
    try {
        const size = new Size(req.body);
        const result = await size.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router