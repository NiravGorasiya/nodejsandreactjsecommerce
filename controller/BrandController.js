const { isValidObjectedId } = require("../helper/common-function");
const Brand = require("../Models/Brand")
const { createResponse, successResponce, queryErrorRelatedResponse, deleteResponce } = require("../util/SendResponse")

const addBrand = async (req, res, next) => {
    try {
        const brand = new Brand(req.body);
        const result = await brand.save();
        return createResponse(req, res, result)
    } catch (error) {
        res.status(501).json({ message: error.message })
    }
}

const getAllBrand = async (req, res, next) => {
    try {
        const result = await Brand.find()
        return successResponce(req, res, result)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const editBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id);
        brand.brand_name = req.body.brand_name
        brand.save();
        return successResponce(req, res, brand)
    } catch (error) {

    }
}

const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id)
        console.log(brand);
        if (!brand) {
            queryErrorRelatedResponse(req, res, 404, "Brand not found")
        }
        return deleteResponce(req, res, "brand delete successfull")
    } catch (error) {
        console.log(error, "error");
    }
}

module.exports = { addBrand, getAllBrand, editBrand, deleteBrand }