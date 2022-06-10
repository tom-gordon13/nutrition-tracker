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
    let currBucket = await FoodBucket.findOne({ user: req.user._id, id: req.body.currBucket.id, date: req.body.currBucket.date }).exec();

    if (req.body.lineItem) {
        let foodItemRef = await FoodItem.findOne({ fdcId: req.body.lineItem.fdcId }).exec();

        let newFoodItem = {
            foodRef: foodItemRef.id,
            itemName: req.body.lineItem.itemName,
            fdcId: req.body.lineItem.fdcId,
            meal: req.body.currentMeal,
            category: req.body.category,
            servingSize: req.body.servingSize,
            brandName: req.body.brandName,
            brandName: req.body.brandOwner
        }
        await currBucket.addItemToBucket(newFoodItem)

    }
    res.json(currBucket)
}

async function getCurrMealItems(req, res) {
    let currBucketArr = await FoodBucket.find({ user: req.user._id, date: req.params.currBucketDate }).exec();

    if (currBucketArr.length > 0) {
        FoodBucket.findOne({ user: req.user._id, date: req.params.currBucketDate }).populate({
            path: 'itemsEaten',
            populate: {
                path: 'foodRef',
                model: 'FoodItem'
            }
        }).exec(function (err, doc) {
            let currMealItems = doc.itemsEaten.filter(item => item.meal === req.params.currentMeal)
            
            res.json(currMealItems)
        })
    }
}

async function updateBucket(req, res) {
    let currBucket = await FoodBucket.findOne(({ user: req.user._id, date: req.params.tempDate }))
    res.json(currBucket)
}

async function deleteBucketItem(req, res) {
    let currBucket = await FoodBucket.findOne({ user: req.user._id, id: req.params.currBucketId, date: req.params.currBucketDate }).exec();
    await currBucket.deleteItemFromBucket(req.params.currentMeal, req.params.idx)
    res.json(currBucket)
}


const nutrientDefaultObj = {
    'Carbohydrates': { value: 0, units: 'G' },
    'Protein': { value: 0, units: 'G' },
    'Total Fat': { value: 0, units: 'G' },
    'Saturated Fat': { value: 0, units: 'G' },
    'Trans Fat': { value: 0, units: 'G' },
    'Sodium': { value: 0, units: 'MG' },
    'Sugar': { value: 0, units: 'G' },
    'Iron': { value: 0, units: 'MG' },
    'Calcium': { value: 0, units: 'MG' },
    'Fiber': { value: 0, units: 'G' },
    'Potassium, K': { value: 0, units: 'MG' },
    'Vitamin A': { value: 0, units: 'IU' },
    'Vitamin B-6': { value: 0, units: 'MG'},
    'Vitamin C': { value: 0, units: 'MG' },
    'Vitamin K': { value: 0, units: 'UG' }
}

let nutrientMatcher = {
    'Carbohydrate, by difference': 'Carbohydrates',
    'Protein': 'Protein',
    'Total lipid(fat)': 'Total Fat',
    'Fatty acids, total saturated': 'Saturated Fat',
    'Fatty acids, total trans': 'Trans Fat',
    'Sodium, Na': 'Sodium',
    'Sugars, total including NLEA': 'Sugar',
    'Iron, Fe': 'Iron',
    'Calcium, Ca': 'Calcium',
    'Fiber, total dietary': 'Fiber',
    'Potassium, K': 'Potassium, K',
    'Vitamin A, IU': 'Vitamin A',
    'Vitamin B - 6': 'Vitamin B-6',
    'Vitamin C, total ascorbic acid': 'Vitamin C',
    'Vitamin K(phylloquinone)': 'Vitamin K',
}


async function getBucketNutrients(req, res) {
    let nutrientObj =  JSON.parse(JSON.stringify(nutrientDefaultObj))
    
    FoodBucket.findOne({ user: req.user._id, date: req.params.currDate }).populate({
        path: 'itemsEaten',
        populate: {
            path: 'foodRef',
            model: 'FoodItem'
        }
    }).exec(function (err, doc) {
        doc.itemsEaten.forEach(item => {
            item.foodRef.nutrientArr.forEach(nutrient => {
                
                !nutrientObj[nutrientMatcher[nutrient.nutrientName]] ? nutrientObj[nutrientMatcher[nutrient.nutrientName]] = { 'value': nutrient.value, 'units': nutrient.units } : nutrientObj[nutrientMatcher[nutrient.nutrientName]].value += nutrient.value
            })
        })
        delete nutrientObj['undefined']
        res.json(nutrientObj)
    })
}


