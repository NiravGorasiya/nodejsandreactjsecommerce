const Color = require("../Models/Color");
const { createResponse, successResponce, queryErrorRelatedResponse } = require("../util/SendResponse");

const addColor = async (req, res, next) => {
    try {
        const color = new Color(req.body)
        const result = await color.save();
        return createResponse(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await Color.find();
        successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const updateColor = async (req, res, next) => {
    try {
        const color = await Color.findByIdAndUpdate(req.params.id, {
            colorname: req.body.colorname
        }, { new: true })
        successResponce(req, res, color)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const delteColor = async (req, res, next) => {
    try {
        const color = await Color.findById(req.params.id)
        if (!color) {
            queryErrorRelatedResponse(req, res, 404, "color not found")
        }
        color.delete()
        return successResponce(req, res, "delete color successfull")
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = { addColor, getAll, updateColor, delteColor }