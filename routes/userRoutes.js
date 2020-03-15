const anExpress = require('express');
const router = anExpress.Router()
const joiSchemaValidation = require('../middleware/joiSchemaValidation');
const userSchema = require('../apiSchema/userSchema');
const userController = require('../controller/userController');

// routes
// routes => controller => service => db
router.post('/signup', joiSchemaValidation.validateBody(userSchema.signup), userController.signup)

router.post('/login', joiSchemaValidation.validateBody(userSchema.login), userController.login);

module.exports = router;