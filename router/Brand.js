const router = require("express").Router()
const { addBrand, getAllBrand, editBrand, deleteBrand } = require("../controller/BrandController")

const upload = require("../util/imageUpload")


router.post("/add", upload.fields([{ name: 'brand_logo', maxCount: 1 }, { name: 'brand_banner', maxCount: 1 }]), addBrand);
router.get("/all", getAllBrand);
router.put("/edit/:id", upload.fields([{ name: 'brand_logo', maxCount: 1 }, { name: 'brand_banner', maxCount: 1 }]), editBrand)
router.delete("/delete/:id", deleteBrand)

module.exports = router