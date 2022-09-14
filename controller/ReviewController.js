const Review = require("../Models/Review");
const { createResponse, successResponce } = require("../util/SendResponse");

const addReview = async (req, res, next) => {
    try {
        const review = new Review(req.body)
        const result = await review.save();
        return createResponse(req, res, result)
    } catch (error) {
        return res.status(500).json({ erorr: error.message })
    }
}

const getAllreview = async (req, res, next) => {
    try {
        const result = await Review.find();
        return successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { addReview, getAllreview }