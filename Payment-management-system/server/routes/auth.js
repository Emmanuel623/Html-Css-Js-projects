const express = require('express');
const { handleUserSignup, handleUserSignin } = require('../controllers/auth');
const path = require('path')

const router = express.Router();

router.use('/', express.static(path.join(__dirname, '../views')));

const signupfilepath = path.join(__dirname, '../views/signup.html')
const signinfilepath = path.join(__dirname, '../views/signin.html')

router.get('/signup', (req, res) => {
    return res.sendFile(signupfilepath);
})

router.get('/signin', (req, res) => {
    return res.sendFile(signinfilepath);
})

router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);


module.exports = {
    router
}