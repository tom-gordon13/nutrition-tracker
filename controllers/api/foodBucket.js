const FoodBucket = require('../../models/foodBucket')

module.exports = {
    createNewBucket,
    addLineItem,
    getCurrMealItems,
    deleteBucketItem
}

async function createNewBucket(req, res) {
    req.body.user = req.user._id
    
    let bucketMatch = await FoodBucket.find({ user: req.user._id, date: new Date().toISOString().split('T')[0] }).exec();

    if (bucketMatch.length === 0) {
        let newBucket = {
            date: new Date().toISOString().split('T')[0],
            user: req.body.user,
            itemsEaten: []
        }

        const newFoodBucket = await FoodBucket.create(newBucket);
        res.json(newFoodBucket)
    }

    if (bucketMatch.length > 0) {
        res.json(bucketMatch[0])
    }
}


async function addLineItem(req, res) {
    
    let currBucket = await FoodBucket.findOne({ user: req.user._id}).exec();
    
    if (req.body.lineItem) {
        
        let newFoodItem = {
            itemName: req.body.lineItem.itemName,
            fdcId: req.body.lineItem.fdcId,
            meal: req.body.currentMeal
        }
        
        await currBucket.addItemToBucket(newFoodItem)
        
    }

    res.json(currBucket)
}

async function getCurrMealItems(req, res) {
    
    let currBucketArr = await FoodBucket.find({ user: req.user._id}).exec();
    
    if (currBucketArr.length > 0 && currBucketArr[0].itemsEaten.length > 0) {
        let currMealItems = currBucketArr[0].itemsEaten.filter( item =>  item.meal === req.params.currentMeal)
        res.json(currMealItems)
    }
}


async function deleteBucketItem(req, res) {
    
    let currBucket = await FoodBucket.findOne({ user: req.user._id}).exec();
    await currBucket.deleteItemFromBucket(req.params.currentMeal, req.params.idx)
    res.json(currBucket)
}