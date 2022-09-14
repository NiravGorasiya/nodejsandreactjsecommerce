const { isValidObjectedId } = require("../helper/common-function");
const Brand = require("../Models/Brand")
const Product = require("../Models/Product")
const { createResponse, successResponce, queryErrorRelatedResponse, deleteResponce } = require("../util/SendResponse")
const fs = require("fs")
const addBrand = async (req, res, next) => {
    try {
        const brand = new Brand({
            description: req.body.description,
            slug: req.body.slug,
            brand_name: req.body.brand_name,
            brand_logo: req.files.brand_logo[0].filename,
            brand_banner: req.files.brand_banner[0].filename
        });
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
        res.status(501).json({ error: error })
    }
}

const editBrand = async (req, res, next) => {
    try {
        const imagedata = await Brand.findById(req.params.id)
        console.log(imagedata);
        let brandBanner = ''
        if (req.files.brand_banner) {
            brandBanner = req.files.brand_banner[0].filename
            try {
                fs.unlinkSync("./public/uploads/" + imagedata.brand_banner)
            } catch (error) {
                console.log(error);
            }
        } else {
            brandBanner = imagedata.brand_banner
        }
        let brandLogo = ''
        if (req.files.brand_logo) {
            brandLogo = req.files.brand_logo[0].filename
            try {
                fs.unlinkSync("./public/uploads/" + imagedata.brand_logo)
            } catch (error) {
                console.log(error);
            }
        } else {
            brandLogo = imagedata.brand_logo
        }
        const brand = await Brand.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: {
                    description: req.body.description,
                    slug: req.body.slug,
                    brand_name: req.body.brand_name,
                    brand_logo: brandBanner,
                    brand_banner: brandLogo
                }
            }, { new: true }
        )
        return successResponce(req, res, brand)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const deleteBrand = async (req, res, next) => {
    try {
        const brand = await Brand.findById(req.params.id)
        if (!brand) {
            queryErrorRelatedResponse(req, res, 404, "Brand not found")
        }
        fs.unlinkSync("./public/uploads/" + brand.brand_banner)
        fs.unlinkSync("./public/uploads/" + brand.brand_logo)
        const product = await Product.findOneAndUpdate({ $unset: { brand_id: req.params.id } })
        brand.delete();
        return deleteResponce(req, res, "brand delete successfull")
    } catch (error) {
        console.log(error, "error");
    }
}

module.exports = { addBrand, getAllBrand, editBrand, deleteBrand }