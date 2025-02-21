const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', async (req, res) => {
    try {
        let { search, sort } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' }; 
        }

        let products = await Product.find(query);

        if (sort === 'asc') {
            products.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            products.sort((a, b) => b.price - a.price);
        }

        res.render('catalog', { title: 'Catalog', products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
