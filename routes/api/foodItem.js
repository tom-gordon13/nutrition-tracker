const express = require('express')
const router = express.Router();
const foodItemCtrl = require('../../controllers/api/foodItem');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/posts
router.post('/', foodItemCtrl.create)

module.exports = router