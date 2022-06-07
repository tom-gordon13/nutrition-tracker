const express = require('express')
const router = express.Router();
const foodBucketCtrl = require('../../controllers/api/foodBucket');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/posts
router.post('/addBucket', foodBucketCtrl.createNewBucket)
router.post('/addLineItem', foodBucketCtrl.addLineItem)
router.get('/:currentMeal', foodBucketCtrl.getCurrMealItems)
router.delete('/:currentMeal/:idx', foodBucketCtrl.deleteBucketItem)




module.exports = router



