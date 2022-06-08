const mongoose = require('mongoose')
const Schema = mongoose.Schema
const foodItemSchema = require('./foodItem')

const itemsEatenSchema = new Schema ({
    foodRef: {
        type: Schema.Types.ObjectId,
        ref: 'FoodItem',
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    fdcId: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        default: 1
    },
    meal: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
        default: 'Breakfast'
    },
    // dish: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Dish',
    //     required: false,
    // }
}, {
    timestamps: true
})


const foodBucketSchema = new Schema({
    date: {
        type: String,
        default: new Date().toISOString().split('T')[0],
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemsEaten: [itemsEatenSchema]

}, {
    timestamps: true
})


// VIRTUAL ATTRIBUTES
foodBucketSchema.virtual('nutrientTotal').get(function(nutrientName) {
    let total = 0;

    for (nutrient of nutrientName) {

    }

})


// INSTANCE METHODS
foodBucketSchema.methods.addItemToBucket = async function(item) {
    
    // set 'bucket' variable to current bucket object
    const bucket = this;
    bucket.itemsEaten.push( item ) 
    
    return bucket.save();
}

foodBucketSchema.methods.deleteItemFromBucket = async function(currentMeal, idx) {
    const bucket = this;
    
    let item_id = bucket.itemsEaten.filter(item => item.meal === currentMeal)[idx].id
    let newItems = bucket.itemsEaten.filter(item => item.id !== item_id)
    bucket.itemsEaten = newItems;
    return bucket.save();

}


foodBucketSchema.methods.getBucketNutrients = async function () {
    const bucket = this;

}



module.exports = mongoose.model('FoodBucket', foodBucketSchema)