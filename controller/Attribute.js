const Attribute = require("../Models/Attribute")
const { createResponse, successResponce, queryErrorRelatedResponse } = require("../util/SendResponse")
const Product = require("../Models/Product")

const addAttribute = async (req, res, next) => {
    try {
        const existName = await Attribute.findOne({ name: req.body.name })
        if (existName) {
            const findName = await Attribute.findOne({ name: req.body.name })
            findName.arrtibute_group_id = req.body.arrtibute_group_id
            findName.value = req.body.value
            findName.save()
            return createResponse(req, res, findName)
        } else {
            let productAttribute = new Attribute({
                arrtibute_group_id: req.body.arrtibute_group_id,
                value: req.body.value,
                name: req.body.name
            })
            const result = await productAttribute.save();
            return createResponse(req, res, result)
        }
    } catch (error) {

        console.log(error);
        return res.status(500).json({ error: error })
    }
}

const getAllProductAttribute = async (req, res, next) => {
    try {
        const productAttribute = await Attribute.find().populate('arrtibute_group_id');
        return successResponce(req, res, productAttribute);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const editProductAttribute = async (req, res, next) => {
    try {
        const attribute = await Attribute.findByIdAndUpdate({ _id: req.params.id }, {
            arrtibute_group_id: req.body.arrtibute_group_id,
            name: req.body.name,
            value: req.body.value
        }, { new: true })
        console.log(attribute, "attribute");
        successResponce(req, res, attribute)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const deleteAttribute = async (req, res, next) => {
    try {
        console.log(req.params.id, "attribute");
        const attribute = await Attribute.findById(req.params.id)
        if (!attribute) {
            return queryErrorRelatedResponse(req, res, 404, "Attribute note found")
        }
        attribute.delete();
        successResponce(req, res, "Attribute successfull delete")
    } catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: error })
    }
}


module.exports = { addAttribute, getAllProductAttribute, editProductAttribute, deleteAttribute }