const FoodBucket = require('../../models/foodBucket')
const FoodItem = require('../../models/foodItem')

module.exports = {
    createNewBucket,
    addLineItem,
    getCurrMealItems,
    updateBucket,
    deleteBucketItem,
    getBucketNutrients 
}

async function createNewBucket(req, res) {
    req.body.user = req.user._id
    
    let bucketMatch = await FoodBucket.find({ user: req.user._id, date: req.params.currDate }).exec();

    if (bucketMatch.length === 0) {
        let newBucket = {
            date: req.params.currDate,
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
    let currBucket = await FoodBucket.findOne({ user: req.user._id, id: req.body.currBucket.id, date: req.body.currBucket.date}).exec();
    let foodItemRef = await FoodItem.findOne({ fdcId: req.body.lineItem.fdcId }).exec();

    if (req.body.lineItem) {
        
        let newFoodItem = {
            foodRef: foodItemRef.id, 
            itemName: req.body.lineItem.itemName,
            fdcId: req.body.lineItem.fdcId,
            meal: req.body.currentMeal
        }
        await currBucket.addItemToBucket(newFoodItem)
    }
    res.json(currBucket)
}

async function getCurrMealItems(req, res) {
    let currBucketArr = await FoodBucket.find({ user: req.user._id, date: req.params.currBucketDate}).exec();
    if (currBucketArr.length > 0) {
        let currMealItems = currBucketArr[0].itemsEaten.filter( item =>  item.meal === req.params.currentMeal)
        res.json(currMealItems)
    }
}


async function updateBucket(req, res) {
    let currBucket = await FoodBucket.findOne(({ user: req.user._id, date: req.params.tempDate}))
    res.json(currBucket)
}

async function deleteBucketItem(req, res) {
    let currBucket = await FoodBucket.findOne({ user: req.user._id, id: req.params.currBucketId, date: req.params.currBucketDate}).exec();
    await currBucket.deleteItemFromBucket(req.params.currentMeal, req.params.idx)
    res.json(currBucket)
}


async function getBucketNutrients(req, res) {
    let currBucket = await FoodBucket.findOne({ user: req.user._id, id: req.params.currBucketId, date: req.params.currDate});
    
    let nutrientObj = {}

    FoodBucket.findOne({ id: currBucket._id}).populate({
                    path: 'itemsEaten',
                    populate: {
                        path: 'foodRef',
                        model: 'FoodItem'
                    }
                }).exec(function(err, doc) {
                    
                    

                    doc.itemsEaten.forEach( item => {
                        
                        item.foodRef.nutrientArr.forEach(nutrient => {
                            // nutrientObj[nutrient.nutrientName] ? nutrientObj[nutrient.nutrientName] += nutrient.value : nutrientObj[nutrient.nutrientName] = nutrient.value
                            
                            !nutrientObj[nutrient.nutrientName] ? nutrientObj[nutrient.nutrientName] = {'value': nutrient.value, 'units': nutrient.units} : nutrientObj[nutrient.nutrientName].value += nutrient.value
                        })
                    })
                    res.json(nutrientObj)
                })
    
    
}


