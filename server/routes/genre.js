const express = require('express');
const router = express.Router();
const HandleGenre = require('../controllers/genre.js');

router.post('/', HandleGenre);

module.exports = router;