const router = require("express").Router();
const { addTags, getAllTags } = require("../controller/TagsController")

router.post("/add", addTags)
router.get("/all", getAllTags)
module.exports = router;