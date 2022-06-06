const mongoose = require('mongoose')
const Schema = mongoose.Schema
const foodItemSchema = require('./foodItem')

const itemsEatenSchema = new Schema ({
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


// INSTANCE METHODS
foodBucketSchema.methods.addItemToBucket = async function(item) {
    console.log('hi')
    // set 'bucket' variable to current bucket object
    const bucket = this;

    bucket.itemsEaten.push( item ) 
    console.log(`Item - ${item}`)
    console.log(`Bucket - ${bucket}`)
    return bucket.save();
}



module.exports = mongoose.model('FoodBucket', foodBucketSchema)