// Service modules hold the code that implements
//  "business"/application logic

// Service methods often depend upon or use methods in the API modules

import sendRequest from './send-request'
const BASE_URL = '/api/users';
// const BASE_URL_LOGIN = '/api/users/login';


// Refactored code below
export function signUp(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
  }
  
  export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
  }

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}

