const express = require('express');
const router = express.Router();
const { registration, login, logout } = require('../controllers/authentication.controller.js')


router.post('/register', registration)
router.post('/login', login)
router.post('/logout', logout)


module.exports = router