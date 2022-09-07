const Color = require("../Models/Color");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
    try {
        const color = new Color(req.body);
        const result = await color.save();
        res.status(201).json(result)
    } catch (error) {
        console.log(error, "error");
    }
})


module.exports = router;