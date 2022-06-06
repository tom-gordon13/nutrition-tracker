const mongoose = require('mongoose')
const Schema = mongoose.Schema
const foodItemSchema = require('./foodItem')

const itemsEatenSchema = new Schema ({
    foodItem: foodItemSchema,
    qty: {
        type: Number,
        default: 1
    },
    meal: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
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
        type: Date,
        default: new Date(),
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


// INSTANCE METHODS
foodBucketSchema.methods.addItemtToBucket = async function(itemId) {
    // set 'bucket' variable to current bucket object
    const bucket = this;

    // const newFoodItem 
}



module.exports = mongoose.model('FoodBucket', foodBucketSchema)