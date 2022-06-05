import sendRequest from './send-request'

const BASE_URL = '/api/foodItem'


export function addFoodItem(foodItem){
    return sendRequest(`${BASE_URL}/add-item`, 'POST', foodItem)
}