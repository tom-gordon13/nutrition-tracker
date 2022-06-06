const FoodBucket = require('../../models/foodBucket')

module.exports = {
    createNewBucket,
    addLineItem,
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
}


async function addLineItem(req, res) {
    
    
    let newFoodItem = {
        itemName: req.body.lineItem.itemName,
        fdcId: req.body.lineItem.fdcId,
    }
    
    let currBucket = await FoodBucket.findOne({ user: req.user._id}).exec();
    
    // console.log(currBucket.user)
    // console.log(newFoodItem)
    console.log('hihi')
    await currBucket.addItemToBucket(newFoodItem)
    
    // res.json(newFoodItem)
}


// foodItem: {
//     type: Schema.Types.ObjectId,
//     ref: 'FoodItem',
//     required: true
// },
// qty: {
//     type: Number,
//     default: 1
// },
// meal: {
//     type: String,
//     enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
// },
