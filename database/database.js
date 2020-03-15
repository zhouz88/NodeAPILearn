const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017", {useNewUrlParser:true});
        console.log("Database connected")
    } catch (e) {
        console.log('Database connect error')
    }
}