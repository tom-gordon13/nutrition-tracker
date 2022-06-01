    // import all named exports
    import * as usersAPI from "./users-api"
    // import { getUser } from "../pages/App/App"

    export async function signUp(userData) {
        // Delegate the network/AJAX request code to the users-api.js
        // which will ultimately return a JSON Web Token (JWT)

        const token = await usersAPI.signUp(userData);
        // Persist the token
        localStorage.setItem('token', token)
        return getUser();
        
    }

    export function getToken() {
        // getItem returns null if there is no string
        const token = localStorage.getItem('token')
        if (!token) return null

        // obtain the payload of the token
        const payload = JSON.parse(atob(token.split('.')[1]))

        // A JWT exp is expressed in seconds, not miliseconds
        if (payload.exp < Date.now() / 1000) {
            // Token has expired - remove from localStorage
            localStorage.removeItem('token');
            return null
        }
        return token;
    }

    export function getUser() {
        const token = getToken();

        // If there's a token, return the user in the payload
        return token ? JSON.parse(atob(token.split('.')[1])).user : null;
    }

    export function logOut() {
        localStorage.removeItem('token')
    }

    export async function login(credentials) {
        const token = await usersAPI.login(credentials);
        localStorage.setItem('token', token)
        return getUser();
    }

    export async function checkToken() {
        return usersAPI.checkToken()
            .then(dateStr => new Date(dateStr))
    }