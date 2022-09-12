const router = require("express").Router();
const { addAttributeGroup, getAllAttributeGroup, editAttributeGroup, deleteAttribute } = require("../controller/AttributeGroupController")

router.post("/add", addAttributeGroup)
router.get("/all", getAllAttributeGroup)
router.put("/edit/:id", editAttributeGroup)
router.delete("/delete/:id", deleteAttribute)

module.exports = router;