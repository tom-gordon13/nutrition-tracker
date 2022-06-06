let FoodItem = require('../../models/foodItem')

module.exports = {
    createFoodItem
}

async function createFoodItem(req, res) {
    
    req.body.user = req.user._id
    let newItem = ({
        itemName: req.body.itemName,
        fdcId: req.body.fdcId,
        servingSize: `${req.body.servingSize}${req.body.servingSizeUnit}`
    })
    
    let foodMatch = await FoodItem.find({'fdcId': req.body.fdcId}).exec();
    if (foodMatch.length === 0) {
        const newFoodItem = await FoodItem.create(newItem);
        res.json(newFoodItem)
    }
}