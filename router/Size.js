const router = require("express").Router()
const { addSize, getAllSize, deleteSize, updateSize } = require("../controller/SizeController")

router.post("/add", addSize)
router.get("/all", getAllSize)
router.delete("/delete/:id", deleteSize)
router.put("/update/:id", updateSize)
module.exports = router