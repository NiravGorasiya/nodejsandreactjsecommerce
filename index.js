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
const color = require("./router/Color")
const Brand = require("./router/Brand")
const Size = require("./router/Size")
const User = require("./router/User")
const product = require("./router/product")
const ProductAttribute = require("./router/Attribute")
const tags = require("./router/Tags")
const ProductAttributeGroup = require("./router/AttributeGroup")

app.use("/category", category)
app.use("/color", color)
app.use("/brand", Brand)
app.use("/size", Size)
app.use("/user", User)
app.use("/product", product)
app.use("/tags", tags)
app.use("/attribute", ProductAttribute)
app.use("/attribute_group", ProductAttributeGroup)

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.all('*', function (req, res, next) {
    return res.status(404).json({ error: "page not found" })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})