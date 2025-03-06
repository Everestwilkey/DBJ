import jwt_decode from "jwt-decode";
import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

const tokenKey = "so-token";
export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey, token);
        window.location = redirect;
    } catch (err) {
        alertMessage(err.message.message);
    }
}

export function checkLogin() {
    
}

function isTokenValid(token) {
    if (token) {
        // decode the token
        const decoded = jwt_decode(token);
        // get the current date
        let currentDate = new Date();
        // JWT exp is in seconds, the time from our current date will be milliseconds.
        if (decoded.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            return false;
        } else {
            // token not expired.
            console.log("Valid token");
            return true;
        }

    } else return false;
}