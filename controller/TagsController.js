const Tags = require("../Models/Tags")
const { createResponse, successResponce } = require("../util/SendResponse")

const addTags = async (req, res, next) => {
    try {
        let tags = req.body.name
        let tagList = [];
        let promise = tags.split(",").map(async (item) => {
            const Exittags = await Tags.findOne({ name: item }, { ordered: false })
            if (!Exittags) tagList.push({ name: item })
        })

        await Promise.all(promise)
        const result = await Tags.insertMany(tagList)
        createResponse(req, res, result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error })
    }
}

const getAllTags = async (req, res, next) => {
    try {
        const result = await Tags.find()
        successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports = { addTags, getAllTags }