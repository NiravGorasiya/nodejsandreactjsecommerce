const router = require("express").Router()
const { addAttribute, getAllProductAttribute, editProductAttribute } = require("../controller/Attribute")


router.post("/add", addAttribute)
router.get("/all", getAllProductAttribute)
router.put("/edit/:id", editProductAttribute)

module.exports = router