const Article = require("../Models/Article");
const { createResponse, successResponce, queryErrorRelatedResponse, deleteResponce } = require("../util/SendResponse");
const fs = require("fs")
const addAtricle = async (req, res, next) => {
    try {
        const article = new Article({
            name: req.body.name,
            description: req.body.description,
            user_id: req.body.user_id,
            image: req.file.filename,
            comment: req.body.comment
        })
        const result = await article.save();
        return createResponse(req, res, result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllArticle = async (req, res, next) => {
    try {
        const result = await Article.find();
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const editArticle = async (req, res, next) => {
    try {
        const imagedata = await Article.findById({ _id: req.params.id });
        if (!imagedata) {
            return queryErrorRelatedResponse(req, res, 404, "Article not found")
        }
        let image = ''
        if (req.file) {
            image = req.file.filename
            try {
                fs.unlinkSync("./public/uploads/" + imagedata.image)
            } catch (error) {
                console.log(error);
            }
        } else {
            image = imagedata.image
        }
        const article = await Article.findOneAndUpdate({ _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    user_id: req.body.user_id,
                    image: image,
                    comment: req.body.comment
                }
            }, { new: true }
        )
        return successResponce(req, res, article)
    } catch (error) {
        console.log(error, "error");
        return res.status(500).json(error)
    }
}

const deleteArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id)
        if (!article) {
            queryErrorRelatedResponse(req, res, 404, "Article not found")
        }
        fs.unlinkSync("./public/uploads/" + article.image)
        article.delete();
        return deleteResponce(req, res, "Article delete successfull")
    } catch (error) {
        return res.status(500).json(error)
    }
}


module.exports = { addAtricle, getAllArticle, editArticle, deleteArticle }