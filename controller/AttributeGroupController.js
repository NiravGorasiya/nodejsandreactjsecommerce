const Product_attribute = require("../Models/Attribute");
const ProductAttributeGroup = require("../Models/Attribute_Group")
const { createResponse, successResponce, deleteResponce } = require("../util/SendResponse")

const addProductAttributeGroup = async (req, res, next) => {
    try {
        const productattributegroup = new ProductAttributeGroup(req.body);
        const result = await productattributegroup.save()
        return createResponse(req, res, result);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const getAllProductAttributeGroup = async (req, res, next) => {
    try {
        const result = await ProductAttributeGroup.find();
        return successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const editProductAttributeGroup = async (req, res, next) => {
    try {
        const id = req.params.id
        const productattributegroup = await ProductAttributeGroup.findByIdAndUpdate({ _id: id }, {
            name: req.body.name
        }, { new: true })
        return successResponce(req, res, productattributegroup)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProductAttribute = async (req, res, next) => {
    try {
        const id = req.params.id;
        const productAttributegroupDelete = await ProductAttributeGroup.findById({ _id: id })
        //productAttributegroupDelete.delete();
        const productAttributedelete = await Product_attribute.findById({ _id: id })
        return deleteResponce(req, res, "product attribute group successfull delete")
    } catch (error) {
        return res.status()
    }
}

module.exports = { addProductAttributeGroup, getAllProductAttributeGroup, editProductAttributeGroup, deleteProductAttribute }