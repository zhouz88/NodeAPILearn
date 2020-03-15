const constants = require('../constants/index');
const Joi = require('@hapi/joi');

//validation controller
const validateObjectSchema = (data, schema) => {
     const result = Joi.validate(data, schema);
     console.log('Joi Schema Validation Result===', result)
    if (result.error) {
        return result.error.details.map(value => {
            return {
                error: value.message,
                path: value.path,
            }
        })
    } else {
        return null;
    }
}

//validation controller
module.exports.validateBody = (schema) => {
    return (req, res, next) => {
        let response = {... constants.defaultServerResponse}
       const error = validateObjectSchema(req.body, schema);
       if (error) {
           response.body = error;
           response.message = constants.requestValidationMessage.BAD_REQUEST;
           return res.status(response.status).send(response);
       } else {
          return next();
       }
    }
}

//validation controller
// routes => controller => service => db
module.exports.validateQueryParams = (schema) => {
    return (req, res, next) => {
        let response = {... constants.defaultServerResponse}
        const error = validateObjectSchema(req.query, schema);
        if (error) {
            response.body = error;
            response.message = constants.requestValidationMessage.BAD_REQUEST;
            return res.status(response.status).send(response);
        } else {
            return next();
        }
    }
}

