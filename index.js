"use strict";
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
require("./db/Connection")
const morgan = require("morgan")
const cors = require("cors")

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


const category = require("./router/Category")
const Brand = require("./router/Brand")
const User = require("./router/User")
const product = require("./router/product")
const ProductAttribute = require("./router/Attribute")
const tags = require("./router/Tags")
const ProductAttributeGroup = require("./router/AttributeGroup")
const Review = require("./router/Review")
const News = require("./router/News")
const Article = require("./router/Article")
require("./javascipt")

const api = process.env.PRIFIX

app.use(api + "/category", category)
app.use(api + "/brand", Brand)
app.use(api + "/user", User)
app.use(api + "/attribute_group", ProductAttributeGroup)
app.use(api + "/attribute", ProductAttribute)
app.use(api + "/product", product)
app.use(api + "/tags", tags)
app.use(api + "/review", Review)
app.use(api + "/article", Article)
app.use(api + "/news", News)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.all('*', function (req, res, next) {
    return res.status(404).json({ error: "page not found" })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})