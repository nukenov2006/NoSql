const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('contact'); 
});


router.post('/send-message', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        console.log("", { name, email, message });

        res.redirect('/contact');
    } catch (error) {
        console.error(error);
        res.redirect('/contact');
    }
});

module.exports = router;
