import sendRequest from './send-request'

const BASE_URL = '/api/foodBucket'


export function createFoodBucket(){
    
    return sendRequest(`${BASE_URL}/addBucket`, 'POST')
}

