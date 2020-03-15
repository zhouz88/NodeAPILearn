const Product = require('../database/models/productModel');
const {formatMongoData} = require('../helper/dbHelper');
const constants = require('../constants');
const mongoose = require('mongoose');

//service
module.exports.createProduct = async (servieData) => {
    //                     service
// routes => controller => service => db
   try {
       let product = new Product({... servieData})
       let result =  await product.save();
       return formatMongoData(result);
   } catch (e) {
       console.log('Something went wrong')
       throw new Error(e)
   }
}

//service
module.exports.getAllProducts = async ({skip = 0, limit = 10}) => {
    //                     service
// routes => controller => service => db
    try {
        let products = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit));
        return formatMongoData(products);
    } catch (e) {
        console.log('Something went wrong')
        throw new Error(e)
    }
}

//service
module.exports.getProductById = async ({id}) => {
    //                     service
// routes => controller => service => db
    try {
        let product = await Product.findById(mongoose.Types.ObjectId(id));
        if (!product) {
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(product);
    } catch (e) {
        console.log('id is wrong')
        throw new Error(e)
    }
}

//service
module.exports.updateProduct = async ({id, updateInfo}) => {
    //                     service
// routes => controller => service => db
    try {
        let product = await Product.findOneAndUpdate({_id: id}, updateInfo, {new : true});
        if (!product) {
            throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
        }
        return formatMongoData(product);
    } catch (e) {
        console.log('id is wrong')
        throw new Error(e)
    }
}

//service
module.exports.deleteProduct = async ({id}) => {
    try {
        let product = await Product.findOneAndDelete(id);
        if (!product) {
            throw new Error("Id not found");
        }
        return formatMongoData(product);
    } catch (e) {
        console.log('id is wrong')
        throw new Error(e)
    }
}