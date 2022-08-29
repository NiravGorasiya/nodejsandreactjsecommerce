require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
require("./db/Connection")
const morgan = require("morgan")

app.use(express.json())
app.use(morgan('tiny'))

const product = require("./router/product")
const category = require("./router/Category")
const color = require("./router/Color")
const Brand = require("./router/Brand")
const Size = require("./router/Size")
const User = require("./router/User")
const ProductType = require("./router/Product_type")
const ProductAttribute = require("./router/ProductAttribute")
const ProductAttributeValue = require("./router/ProductAttributeValue")

app.use("/product", product)
app.use("/category", category)
app.use("/color", color)
app.use("/brand", Brand)
app.use("/size", Size)
app.use("/user", User)
app.use("/product_type", ProductType)
app.use("/product_attribute", ProductAttribute)
app.use("/product_attribute_value", ProductAttributeValue)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})