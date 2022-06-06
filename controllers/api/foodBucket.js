const FoodBucket = require('../../models/foodBucket')

module.exports = {
    createNewBucket
}

async function createNewBucket(req, res) {
    req.body.user = req.user._id
    console.log('create bucket attempt')
    let newBucket = {
        date: new Date(),
        user: req.body.user,
        itemsEaten: []
    }

    let bucketMatch = await FoodBucket.find({ user: req.user._id, date: new Date() }).exec();
    if (bucketMatch.length === 0) {
        const newFoodBucket = await FoodBucket.create(newBucket);
        res.json(newFoodBucket)
    }
}
