const Category = require("../Models/Category");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
    try {
        const category = new Category(req.body);
        const result = await category.save();
        res.status(201).json({ message: "success fully category add", result })
    } catch (error) {
        console.log(error, "error");
        res.status(400).json({ error: "error" })
    }
})

module.exports = router;