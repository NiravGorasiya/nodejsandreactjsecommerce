const Product = require("../Models/Product")
const { createResponse, successResponce, queryErrorRelatedResponse } = require("../util/SendResponse")
const { isValidObjectedId } = require("../helper/common-function")
const fs = require("fs")
const Brand = require("../Models/Brand")

const addProduct = async (req, res, next) => {
    try {
        let file = []
        for (i = 0; i < req.files.length; i++) {
            file.push(req.files[i].filename)
        }
        const { name, brand_id, category_id, description, review, tags, reviews, attributes } = req.body
        const product = new Product({
            name,
            brand_id,
            category_id,
            description,
            review,
            tags,
            attributes,
            reviews,
            image: file
        });
        const result = await product.save();
        return createResponse(req, res, result);
    } catch (error) {
        console.log(error, "error");
        next(error);
    }
}

const getAllProduct = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = page * limit - limit;
        const result = await Product.aggregate([
            {
                $lookup: {
                    from: "brands",
                    localField: "brand_id",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $lookup: {
                    from: "attributes",
                    localField: "attributes.attributes_id",
                    foreignField: "_id",
                    let: {
                        attribute_values_ids: {
                            $reduce: {
                                input: "$attributes.attributes_value",
                                initialValue: [],
                                in: {
                                    $concatArrays: [
                                        "$$value",
                                        "$$this.attribute_value_id"
                                    ]
                                }
                            }
                        }
                    },
                    pipeline: [{
                        $project: {
                            _id: 1,
                            name: 1,
                            value: {
                                $filter:
                                {
                                    input: "$value",
                                    as: "grade",
                                    cond: { $in: ["$$grade._id", "$$attribute_values_ids"] }
                                }
                            },
                        },
                    },
                    {
                        $lookup: {
                            from: "attiribute_groups",
                            localField: "_id",
                            foreignField: "attributes.attribute_id",
                            as: "attributesgroup"
                        }
                    }
                    ],
                    as: "attributes",
                }
            },

            {
                $group: {
                    _id: {
                        upcomingProduct: "$upcomingProduct",
                        latestProduct: "$latestProduct",
                        description: "$description",
                        image: "$image",
                        isDelete: "$isDelete",
                        status: "$status",
                        category: "$category.category_name",
                        brand: "$brand.brand_name"
                    },
                    "group": {
                        $push: {
                            "group": "$attributes.attributesgroup"

                        }

                    }
                }
            }
        ]).skip(skip)
            .limit(limit);
        return successResponce(req, res, result)
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id)
        const product = await Product.findById(id)
        if (!product) {
            queryErrorRelatedResponse(req, res, 404, "product not found")
        }
        product.remove();
        res.status(200).json({ message: "successfull delete product" })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let file = []
        for (i = 0; i < req.files.length; i++) {
            file.push(req.files[i].filename)
        }
        const product = await Product.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    brand_id: req.body.brand_id,
                    category_id: req.body.category_id,
                    description: req.body.description,
                    review: req.body.review,
                    attributes: req.body.attributes,
                    tags: req.body.tags,
                    image: file
                }
            },
            { new: true })
        successResponce(req, res, product)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const productFilter = async (req, res, next) => {
    try {
        const brand = await Brand.findOne({ brand_name: req.query.brand })
        const product = await Product.findOne({ brand_id: brand._id })
        return res.status(200).json(product)
    } catch (error) {
        console.log(error, "error");
    }
}
module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct, productFilter }