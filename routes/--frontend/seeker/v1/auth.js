const express = require('express');
const router = express.Router();
const { auth } = require('../../../../middleware');
const authController = require('../../../../controller/seeker-client/v1/authentication');
const { PLATFORM } = require('../../../../constants/authConstant');

// Render EJS template for /register/createAccount route
router.get('/register/createAccount', (req, res) => {
    res.render('seeker/register', { title: 'Register | Recruitment Portal', keywords: '', description: '' });
});

// Render EJS template for /rpLogin route
router.get('/rpLogin', (req, res) => {
    res.render('seeker/login', { title: 'Login | Recruitment Portal', keywords: '', description: '' });
});

// Render EJS template for /rpLogin/forgotPassword route
router.get('/rpLogin/forgotPassword', (req, res) => {
    res.render('forgot-password', { title: 'Forgot Password | Recruitment Portal', keywords: '', description: '' });
});

// Redirect to /auth/google route for Google login
router.get('/login/google', (req, res) => {
    req.session.platform = 'client';
    res.redirect(`https://recruit-mono.onrender.com/auth/google`);
});

module.exports = router;