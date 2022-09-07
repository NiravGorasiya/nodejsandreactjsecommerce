const Product = require("../Models/Product")
const { createResponse, successResponce, queryErrorRelatedResponse } = require("../util/SendResponse")
const { isValidObjectedId } = require("../helper/common-function")

const addProduct = async (req, res, next) => {
    try {
        const product = new Product({
            name: req.body.name,
            brand_id: req.body.brand_id,
            tax: req.body.tax,
            tax_price: req.body.tax_price,
            category_id: req.body.category_id,
            colors_id: req.body.colors_id,
            sizes_id: req.body.sizes_id,
            description: req.body.description,
            review: req.body.review,
            attributes: req.body.attributes,
            image: req.file.filename

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
                            product_group_id: 1,
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
                            from: "product_attiribute_groups",
                            localField: "product_group_id",
                            foreignField: "_id",
                            as: "attributegroup"
                        }
                    }
                    ],
                    as: "attributes",
                }

            },
            {
                $project: {
                    "_id": 1,
                    "upcomingProduct": 1,
                    "latestProduct": 1,
                    "description": 1,
                    "tax": 1,
                    "tax_price": 1,
                    "isDelete": 1,
                    "status": 1,
                    "brand.brand_name": 1,
                    "attributes": 1,
                    "category.category_name": 1,
                }
            }
        ])
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
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        if (!isValidObjectedId(req.params.id)) {
            return queryErrorRelatedResponse(req, res, 404, "Error in invalid product")
        }
        const product = await Product.findByIdAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            brand_id: req.body.brand_id,
            tax: req.body.tax,
            tax_price: req.body.tax_price,
            category_id: req.body.category_id,
            colors_id: req.body.colors_id,
            sizes_id: req.body.sizes_id,
            description: req.body.description,
            review: req.body.review,
            attributes: req.body.attributes,
            image: req.file.filename
        }, { new: true })
        return successResponce(req, res, product)
    } catch (error) {
        next(error);
    }
}
module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct }