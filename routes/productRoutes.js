const anExpress = require('express');
const router = anExpress.Router()
const productController = require('../controller/productController');

const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const tokenValidation = require('../middleware/tokenValidation');

const productSchema = require('../apiSchema/productSchema');

//routes

//routes
//routes => controller => service => db
router.get('/:id', tokenValidation.validateToken,productController.getProductById);
router.put('/:id', tokenValidation.validateToken,productController.updateProduct);
router.delete('/:id', tokenValidation.validateToken,productController.deleteProduct);
router.post('/', tokenValidation.validateToken,joiSchemaValidation.validateBody(productSchema.createProductSchema), productController.createProduct)
router.get('/', tokenValidation.validateToken, joiSchemaValidation.validateQueryParams(productSchema.getAllProductSchema),productController.getAllProducts)

module.exports = router;