let FoodItem = require('../../models/foodItem')

module.exports = {
    createFoodItem
}

async function createFoodItem(req, res) {
    req.body.user = req.user._id
    console.log('hi')
    console.log(req.body)
    // const newFoodItem = await FoodItem.create(req.body);
}