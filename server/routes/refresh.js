const express = require('express');
const router = express.Router();
const {HandleRefresh} = require("../controllers/refresh")

router.get('/', HandleRefresh);

module.exports = router;