const express = require('express')
const router = express.Router();
const foodBucketCtrl = require('../../controllers/api/foodBucket');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/updateBucket/:tempDate', foodBucketCtrl.updateBucket)
router.get('/:currentMeal/:currBucketDate', foodBucketCtrl.getCurrMealItems)

// POST /api/posts
router.post('/addBucket/:currDate', foodBucketCtrl.createNewBucket)
router.post('/addLineItem', foodBucketCtrl.addLineItem)
router.delete('/:currBucketId/:currentMeal/:idx/:currBucketDate', foodBucketCtrl.deleteBucketItem)






module.exports = router



