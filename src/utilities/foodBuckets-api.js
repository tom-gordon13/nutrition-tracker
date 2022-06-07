import sendRequest from './send-request'

const BASE_URL = '/api/foodBucket'


export function createFoodBucket(currDate){
    return sendRequest(`${BASE_URL}/addBucket/${currDate}`, 'POST')
}


export function addItemToBucket(lineItem, currentMeal, currBucket) {
    return sendRequest(`${BASE_URL}/addLineItem`, 'POST', {lineItem, currentMeal, currBucket})
}

export function getCurrMealItems(currentMeal, currBucketDate) {
    return sendRequest(`${BASE_URL}/${currentMeal}/${currBucketDate}`);
}

export function deleteBucketItem(currentMeal, idx) {
    return sendRequest(`${BASE_URL}/${currentMeal}/${idx}`, 'DELETE')
}

export function getCurrBucket(tempDate) {
    return sendRequest(`${BASE_URL}/updateBucket/${tempDate}`)
}
