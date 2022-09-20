const router = require("express").Router()
const { addProduct, getAllProduct, deleteProduct, updateProduct, productFilter } = require("../controller/ProductController");
const upload = require("../util/imageUpload")


router.post("/add", upload.array('image'), addProduct)
router.get("/all", getAllProduct)
router.delete("/delete/:id", deleteProduct)
router.put("/update/:id", upload.array('image'), updateProduct)

router.post("/filter", productFilter)


module.exports = router

