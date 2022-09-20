const News = require("../Models/News")
const { createResponse, successResponce, queryErrorRelatedResponse, deleteResponce } = require("../util/SendResponse");
const fs = require("fs")

const addNews = async (req, res, next) => {
    try {
        const { title, description, user_id, comments } = req.body
        const news = new News({
            title,
            description,
            user_id,
            image: req.file.filename,
            comments
        })
        const result = await news.save();
        return createResponse(req, res, result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getAllNews = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = page * limit - limit;
        const result = await News.find()
            .skip(skip)
            .limit(limit);
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const editNews = async (req, res, next) => {
    try {
        const news = await News.findById({ _id: req.params.id });
        let image = ''
        if (req.file) {
            image = req.file.filename
            try {
                fs.unlinkSync("./public/uploads/" + news.image)
            } catch (error) {
                console.log(error);
            }
        } else {
            image = news.image
        }
        const article = await News.findOneAndUpdate({ _id: req.params.id },
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
        return res.status(500).json(error)
    }
}

const deleteNews = async (req, res, next) => {
    try {
        const article = await News.findById(req.params.id)
        if (!article) {
            queryErrorRelatedResponse(req, res, 404, "News not found")
        }
        fs.unlinkSync("./public/uploads/" + article.image)
        article.delete();
        return deleteResponce(req, res, "News delete successfull")
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { addNews, getAllNews, editNews, deleteNews }

