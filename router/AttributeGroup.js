const router = require("express").Router();
const { addProductAttributeGroup, getAllProductAttributeGroup, editProductAttributeGroup, deleteProductAttribute } = require("../controller/AttributeGroupController")

router.post("/add", addProductAttributeGroup)
router.get("/all", getAllProductAttributeGroup)
router.put("/edit/:id", editProductAttributeGroup)
router.delete("/delete/:id", deleteProductAttribute)

module.exports = router;