const express = require('express');
const router = express.Router();
const HandleLang = require('../controllers/lang');

router.post('/', HandleLang);

module.exports = router;