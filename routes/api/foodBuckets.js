const express = require('express')
const router = express.Router();
const foodBucketCtrl = require('../../controllers/api/foodBucket');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/posts
router.post('/addBucket', foodBucketCtrl.createNewBucket)
router.post('/addLineItem', foodBucketCtrl.addLineItem)

module.exports = router



