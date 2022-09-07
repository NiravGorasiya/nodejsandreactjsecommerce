const ProductAttribute = require("../Models/Attribute")
const { createResponse, successResponce } = require("../util/SendResponse")
const Product = require("../Models/Product")

const addAttribute = async (req, res, next) => {
    try {
        const existName = await ProductAttribute.findOne({ name: req.body.name })
        if (existName) {
            const findName = await ProductAttribute.findOne({ name: req.body.name })
            console.log(findName, "da");
            findName.product_group_id = req.body.product_group_id
            findName.value = req.body.value
            findName.save()
            return createResponse(req, res, findName)
        } else {
            let productAttribute = new ProductAttribute({
                product_group_id: req.body.product_group_id,
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
        const productAttribute = await ProductAttribute.find().populate('product_group_id');
        return successResponce(req, res, productAttribute);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const editProductAttribute = (req, res, next) => {
    try {
        res.send("hello");
    } catch (error) {

    }
}
module.exports = { addAttribute, getAllProductAttribute, editProductAttribute }