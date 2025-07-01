const express = require('express');
const router = express.Router();
const { HandleAddFavourite, HandleRemoveFavourite, HandleFavourite,HandleAll } = require('../controllers/favourites');

router.post('/', HandleFavourite)
router.post('/modify', HandleAddFavourite);
router.post('/modify/delete', HandleRemoveFavourite);
router.post('/all', HandleAll);

module.exports = router;