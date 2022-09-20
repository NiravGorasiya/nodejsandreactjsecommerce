const router = require("express").Router();
const { addNews, getAllNews, editNews, deleteNews } = require("../controller/NewsController");
const upload = require("../util/imageUpload")

router.post("/add", upload.single("image"), addNews)
router.get("/all", getAllNews)
router.put("/update/:id", upload.single("image"), editNews)
router.delete("/delete/:id", deleteNews)

module.exports = router