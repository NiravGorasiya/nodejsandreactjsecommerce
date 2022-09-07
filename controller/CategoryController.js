const Category = require("../Models/Category")
const { createResponse, successResponce, queryErrorRelatedResponse, deleteResponce } = require("../util/SendResponse")
const mongoose = require("mongoose")
const addCategory = async (req, res, next) => {
    try {
        const category = new Category(req.body)
        const result = await category.save();
        return createResponse(req, res, result);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const result = await Category.find();
        return createResponse(req, res, result)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateCategory = async (req, res, next) => {
    try {
        let id = await Category.findById(req.params.id)
        if (!id) return queryErrorRelatedResponse(req, res, 404, "category not found")
        const category = await Category.findByIdAndUpdate({ _id: id }, {
            category_name: req.body.category_name
        })
        return successResponce(req, res, category)
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) return queryErrorRelatedResponse(req, res, 404, "Category not found")
        category.delete();
        return deleteResponce(req, res, "delete category successfull")
    } catch (error) {
        console.log(error, "error");
        return res.status(500).json({ error: error })
    }
}

module.exports = { addCategory, getAllCategory, updateCategory, deleteCategory }