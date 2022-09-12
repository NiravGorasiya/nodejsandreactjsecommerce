const Size = require("../Models/Size");
const { successResponce, createResponse, queryErrorRelatedResponse, deleteResponce } = require("../util/SendResponse");

const addSize = async (req, res, next) => {
    try {
        const size = new Size(req.body)
        const result = await size.save();
        return createResponse(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const getAllSize = async (req, res, next) => {
    try {
        const result = await Size.find()
        successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const updateSize = async (req, res, next) => {
    try {
        const size = await Size.findByIdAndUpdate(req.params.id, {
            sizeName: req.body.sizeName
        }, { new: true })
        successResponce(req, res, size)
    } catch (error) {

    }
}

const deleteSize = async (req, res, next) => {
    try {
        const size = await Size.findById(req.params.id)
        if (!size) {
            queryErrorRelatedResponse(req, res, 404, "size not found")
        }
        size.delete();
        return deleteResponce(req, res, "size successfull delete")
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = { addSize, getAllSize, deleteSize, updateSize }