const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Home', body: '<h1>Welcome to Secure App</h1>' });
});

router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    res.render('dashboard', { title: 'Dashboard', user: req.session.user, body: '' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', body: '' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register', body: '' });
});

module.exports = router;

