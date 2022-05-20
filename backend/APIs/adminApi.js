const exp = require("express")
const adminApp = exp.Router();

const { adminLogin, createProduct, updateProduct, deleteProduct,getProducts } = require('../controllers/adminController')

//admin login
adminApp.post("/login", adminLogin)
//create product
adminApp.post("/create-product", createProduct)
//view products
adminApp.get("/view-products", getProducts)
//update product
//remove product by id








module.exports = adminApp;