const Category = require("../Models/Category")
const Product = require("../Models/Product")
const { createResponse, successResponce, queryErrorRelatedResponse, deleteResponce } = require("../util/SendResponse")
const mongoose = require("mongoose")

const addCategory = async (req, res, next) => {
    try {
        const { category_name, slug, description } = req.body
        const category = new Category({
            category_name,
            image: req.file.filename,
            slug,
            description
        })
        const result = await category.save();
        return createResponse(req, res, result);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = page * limit - limit;
        const result = await Category.find()
            .skip(skip)
            .limit(limit);
        return successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findById({ _id: req.params.id });
        if (!category) {
            return queryErrorRelatedResponse(req, res, 404, "category not found")
        }
        let image = ''
        if (req.file) {
            image = req.file.filename
            try {
                fs.unlinkSync("./public/uploads/" + category.image)
            } catch (error) {
                console.log(error);
            }
        } else {
            image = news.image
        }
        const result = await Category.findByIdAndUpdate({ _id: id },
            {
                $set: {
                    category_name: req.body.category_name,
                    image: image,
                    slug: req.body.slug,
                    description: req.body.description
                }
            }, { new: true })
        return successResponce(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return queryErrorRelatedResponse(req, res, 404, "Category not found")
        }
        const product = await Product.updateMany({ $pull: { category_id: req.params.id } })
        fs.unlinkSync("./public/uploads/" + product.image)
        category.delete();
        return deleteResponce(req, res, "delete category successfull")
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = { addCategory, getAllCategory, updateCategory, deleteCategory }