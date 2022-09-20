const Attribute = require("../Models/Attribute")
const { createResponse, successResponce, queryErrorRelatedResponse } = require("../util/SendResponse")
const Product = require("../Models/Product")

const addAttribute = async (req, res, next) => {
    try {
        const existName = await Attribute.findOne({ name: req.body.name })
        if (existName) {
            const findName = await Attribute.findOne({ name: req.body.name })
            findName.value = req.body.value
            findName.save()
            return createResponse(req, res, findName)
        } else {
            const { value, name } = req.body
            let productAttribute = new Attribute({
                value,
                name
            })
            const result = await productAttribute.save();
            return createResponse(req, res, result)
        }
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const getAllProductAttribute = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = page * limit - limit;
        const productAttribute = await Attribute.find()
            .skip(skip)
            .limit(limit);
        return successResponce(req, res, productAttribute);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const editProductAttribute = async (req, res, next) => {
    try {
        const attribute = await Attribute.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    value: req.body.value
                }
            }, { new: true })
        successResponce(req, res, attribute)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const deleteAttribute = async (req, res, next) => {
    try {
        const attribute = await Attribute.findById(req.params.id)
        if (!attribute) {
            return queryErrorRelatedResponse(req, res, 404, "Attribute note found")
        }
        const product = await Product.updateMany({ $pull: { "attributes": { "attributes_id": req.params.id } } })
        attribute.delete();
        successResponce(req, res, "Attribute successfull delete")
    } catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: error })
    }
}


module.exports = { addAttribute, getAllProductAttribute, editProductAttribute, deleteAttribute }