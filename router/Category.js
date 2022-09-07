const router = require("express").Router();
const { addCategory, getAllCategory, updateCategory, deleteCategory } = require("../controller/CategoryController")

router.post("/add", addCategory);
router.get("/all", getAllCategory)
router.put("/edit/:id", updateCategory)
router.delete("/delete/:id", deleteCategory)
module.exports = router;