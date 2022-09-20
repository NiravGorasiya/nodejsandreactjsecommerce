const router = require("express").Router()
const { addAtricle, getAllArticle, editArticle, deleteArticle } = require("../controller/ArticleController")
const upload = require("../util/imageUpload")

router.post("/add", upload.single("image"), addAtricle)
router.get("/all", getAllArticle)
router.put("/update/:id", upload.single("image"), editArticle)
router.delete("/delete/:id", deleteArticle)

module.exports = router