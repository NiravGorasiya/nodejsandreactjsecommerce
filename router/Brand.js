const router = require("express").Router()
const { addBrand, getAllBrand, editBrand, deleteBrand } = require("../controller/BrandController")

router.post("/add", addBrand);
router.get("/all", getAllBrand);
router.put("/edit/:id", editBrand)
router.delete("/delete/:id", deleteBrand)

module.exports = router