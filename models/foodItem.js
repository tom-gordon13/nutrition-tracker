const mongoose=require('mongoose');
const Schema = mongoose.Schema

const foodItemNutrient = new Schema ({
    nutrientName: {
        type: String,
        required: true
    },
    nutrientId: {
        type: Number,
        required: true
    },
    units: {type: String},
    value: { type: Number },
})

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
    },
    nutrientArr: [foodItemNutrient],
    category: {
        type: String,
        required: false
    },
    brandName: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('FoodItem', foodItemSchema)
