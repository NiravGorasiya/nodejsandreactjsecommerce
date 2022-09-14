const router = require("express").Router()
const { addReview, getAllreview } = require("../controller/ReviewController")

router.post("/add", addReview)
router.get("/all", getAllreview)

module.exports = router;    