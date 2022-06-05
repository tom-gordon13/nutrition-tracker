import sendRequest from './send-request'

const BASE_URL = '/api/food-items'


export function addFoodItem(foodItem){
    return sendRequest(`${BASE_URL}/add-item`, 'POST', foodItem)
}