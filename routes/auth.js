const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.get('/register', (req, res) => {
    res.render('register'); 
});
router.get('/index', (req, res) => {
    res.render('index'); 
});


router.post('/register', async (req, res) => {
    const { name, email, password, password2 } = req.body;

    if (password !== password2) {
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/auth/register');
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            req.flash('error_msg', 'Email is already registered');
            return res.redirect('/auth/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/auth/login');
    } catch (err) {
        console.error(' Registration error:', err);
        req.flash('error_msg', 'Server error, please try again later');
        res.redirect('/auth/register');
    }
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/auth/index',  
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        req.flash('success_msg', 'You are logged out');
        res.redirect('/auth/login');
    });
});

module.exports = router;
