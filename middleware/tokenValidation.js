const constants =  require('../constants');
const jwt = require('jsonwebtoken');


//  validation controller
// routes => controller => service => db
module.exports.validateToken = (req, res, next) => {
    let response = {...constants.defaultServerResponse};
    try {
        if (!req.headers.authorization) {
            throw new Error("Token => data");
        }
        const token = req.headers.authorization.trim();
        console.log(token);
        const decoded = jwt.verify(token, "my-secret-key");
        console.log(decoded)
        return next();
    } catch (e) {
        response.message = e.message;
        response.status = 401;
        return res.status(response.status).send(response);
    }
}