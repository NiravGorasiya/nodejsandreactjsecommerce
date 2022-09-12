const router = require("express").Router()
const { addAttribute, getAllProductAttribute, editProductAttribute, deleteAttribute } = require("../controller/Attribute")


router.post("/add", addAttribute)
router.get("/all", getAllProductAttribute)
router.put("/edit/:id", editProductAttribute)
router.delete("/delete/:id", deleteAttribute)
module.exports = router