const router = require("express").Router();
const { addCategory, getAllCategory, updateCategory, deleteCategory } = require("../controller/CategoryController")

const upload = require("../util/imageUpload")

router.post("/add", upload.single("image"), addCategory);
router.get("/all", getAllCategory)
router.put("/edit/:id", updateCategory)
router.delete("/delete/:id", deleteCategory)

module.exports = router;