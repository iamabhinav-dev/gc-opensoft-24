const express = require('express');
const router = express.Router();
const {HandleAdvancedSearch,HandleAutoSearch,HandleBasicSearch} = require('../controllers/search');

router.post('/', HandleBasicSearch);

router.post('/auto', HandleAutoSearch);

router.post('/advanced', HandleAdvancedSearch);

module.exports = router;