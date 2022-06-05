const mongoose=require('mongoose');
const Schema = mongoose.Schema

const foodItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    fdcId: {
        type: String,
        required: true
    },
    servingSize: {
        type: String,
        required: false
    }
})


module.exports = mongoose.model('FoodItem', foodItemSchema)
