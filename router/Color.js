const router = require("express").Router();
const { addColor, getAll, updateColor, delteColor } = require("../controller/ColorController")

router.post("/add", addColor)
router.get("/all", getAll)
router.put("/update/:id", updateColor)
router.delete("/delete/:id", delteColor)

module.exports = router;