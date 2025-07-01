const express = require('express');
const router = express.Router();
const HandleDetail = require('../controllers/detail');

router.post('/', HandleDetail);

module.exports = router;