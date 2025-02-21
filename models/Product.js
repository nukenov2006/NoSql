const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
	link: { type: String, required: true },
    description: String,
    image: String
});

module.exports = mongoose.model('Product', productSchema, 'shop'); 

