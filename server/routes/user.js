const express = require('express');
const {HandleUserSignUp,HandleUserSignIn} = require('../controllers/user');
const router = express.Router();

router.post('/signup',HandleUserSignUp)
router.post('/signin',HandleUserSignIn)

module.exports = router;