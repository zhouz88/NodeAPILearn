const productService = require('../service/productService');
const productStatusMessage = require('../constants/index');

//params: :id...,  body: json body, query: ?skip=1&limit=10
module.exports.createProduct = async (req, res) => {
    //         controller
// routes => controller => service => db
    let response = {}
    try {
        const responseFromService = await productService.createProduct(req.body)
        response.status = 200;
        response.message = productStatusMessage.productMessage.PRODUCT_CREATED;
        response.body = responseFromService
    } catch (e) {
        console.log('Sth wrong: create Product')
        response.status = 400;
        response.message = e.message;
        response.body = {}
    }
    return res.status(response.status).send(response);
}

module.exports.getAllProducts = async (req, res) => {
    //         controller
// routes => controller => service => db
    let response = {}
    try {
        console.log("here" + req.query)
        const responseFromService = await productService.getAllProducts(req.query)
        response.status = 200;
        response.message = productStatusMessage.productMessage.PRODUCT_FETCHED;
        response.body = responseFromService
    } catch (e) {
        console.log('Sth wrong: getAllProduct')
        response.status = 400;
        response.message = e.message;
        response.body = {}
    }
    return res.status(response.status).send(response);
}

module.exports.getProductById = async (req, res) => {
    //controller
    let response = {}
    try {
        const responseFromService = await productService.getProductById(req.params)
        response.status = 200;
        response.message = productStatusMessage.productMessage.PRODUCT_FETCHED;
        response.body = responseFromService
    } catch (e) {
        console.log('Sth wrong: getAllProduct')
        response.status = 400;
        response.message = e.message;
        response.body = {}
    }
    return res.status(response.status).send(response);
}

module.exports.updateProduct = async (req, res) => {
    //controller
    let response = {}
    try {
        const responseFromService = await productService.updateProduct(
            {
                id: req.params.id,
                updateInfo: req.body,
            }
        )
        response.status = 200;
        response.message = "product update successfully";
        response.body = responseFromService
    } catch (e) {
        console.log('Sth wrong: update product')
        response.status = 400;
        response.message = e.message;
        response.body = {}
    }
    return res.status(response.status).send(response);
}

module.exports.deleteProduct = async (req, res) => {
    //controller
    let response = {}
    try {
        const responseFromService = await productService.deleteProduct(req.params)
        response.status = 200;
        response.message = "product deleted successfully";
        response.body = responseFromService
    } catch (e) {
        console.log('Sth wrong: update product')
        response.status = 400;
        response.message = e.message;
        response.body = {}
    }
    return res.status(response.status).send(response);
}