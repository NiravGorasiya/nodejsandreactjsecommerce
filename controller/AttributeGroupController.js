const Attribute = require("../Models/Attribute");
const ProductAttributeGroup = require("../Models/Attribute_Group")
const { createResponse, successResponce, deleteResponce, queryErrorRelatedResponse } = require("../util/SendResponse")

const addAttributeGroup = async (req, res, next) => {
    try {
        const productattributegroup = new ProductAttributeGroup(req.body);
        const result = await productattributegroup.save()
        return createResponse(req, res, result);
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const getAllAttributeGroup = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = page * limit - limit;
        const result = await ProductAttributeGroup.aggregate([
            {
                $lookup: {
                    from: "attributes",
                    localField: "attributes.attribute_id",
                    foreignField: "_id",
                    as: "attribute"
                }
            }, {
                $project: {
                    "name": 1,
                    "attribute.name": 1
                }
            }
        ]).skip(skip)
            .limit(limit);
        return successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const editAttributeGroup = async (req, res, next) => {
    try {
        const productattributegroup = await ProductAttributeGroup.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            attributes: req.body.attributes
        }, { new: true })
        return successResponce(req, res, productattributegroup)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteAttribute = async (req, res, next) => {
    try {
        const productAttributegroupDelete = await ProductAttributeGroup.findById(req.params.id)
        if (!productAttributegroupDelete) {
            return queryErrorRelatedResponse(req, res, 404, "attribute not found")
        }
        const attribute = await Attribute.findOneAndUpdate({ $unset: { arrtibute_group_id: req.params.id } })
        productAttributegroupDelete.delete();
        return deleteResponce(req, res, "attribute group successfull delete")
    } catch (error) {
        return res.status()
    }
}

module.exports = { addAttributeGroup, getAllAttributeGroup, editAttributeGroup, deleteAttribute }