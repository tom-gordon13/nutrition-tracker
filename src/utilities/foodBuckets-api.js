import sendRequest from './send-request'

const BASE_URL = '/api/foodBucket'


export function createFoodBucket(){
    return sendRequest(`${BASE_URL}/addBucket`, 'POST')
}


export function addItemToBucket(lineItem, currentMeal) {
    return sendRequest(`${BASE_URL}/addLineItem`, 'POST', {lineItem, currentMeal})
}

export function getCurrMealIteams(currentMeal) {
    return sendRequest(`${BASE_URL}/${currentMeal}`);
}

export function deleteBucketItem(currentMeal, idx) {
    return sendRequest(`${BASE_URL}/${currentMeal}/${idx}`, 'DELETE')
}
