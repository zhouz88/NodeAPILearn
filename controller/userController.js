const userService = require('../service/userService');

//controller
module.exports.signup = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await userService.signup(req.body)
        response.status = 200;
        response.message = "sign up success!";
        response.body = responseFromService
    } catch (e) {
        console.log('Sth wrong: sign up')
        response.status = 400;
        response.message = e.message;
        response.body = {}
    }
    return res.status(response.status).send(response);
}


//controller
module.exports.login = async (req, res) => {
    let response = {}
    try {
        const responseFromService = await userService.login(req.body)
        response.status = 200;
        response.message = "log in success!";
        response.body = responseFromService
    } catch (e) {
        console.log('Sth wrong: sign up')
        response.status = 400;
        response.message = e.message;
        response.body = {}
    }
    return res.status(response.status).send(response);
}