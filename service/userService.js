const UserJDBC = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const {formatMongoData} = require('../helper/dbHelper');
const jwt = require('jsonwebtoken');

//service

module.exports.signup =  async ({email, password}) => {
    //                     service
// routes => controller => service => db
    try {
        const user = await UserJDBC.findOne({email});
        if (user) {
            throw new Error("Duplicate Email");
        }
        password = await bcrypt.hash(password, 12);
        const newUserJDBC = new UserJDBC({email, password});
        let result = await newUserJDBC.save();
        return formatMongoData(result);
    } catch (e) {
        console.log('sign up wrong')
        throw new Error(e)
    }
}

//service
module.exports.login =  async ({email, password}) => {
    //                     service
// routes => controller => service => db
    try {
        const user = await UserJDBC.findOne({email});
        if (!user) {
            throw new Error("User not found");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid password");
        }
        const token = jwt.sign({id: user._id}, "my-secret-key", {expiresIn: '1d'});
        return {token};
    } catch (e) {
        console.log('sign up wrong')
        throw new Error(e)
    }
}

