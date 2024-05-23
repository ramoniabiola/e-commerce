import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
// Get the persisted state from localStorage
const persistedState = localStorage.getItem('persist:root');

// Parse the persisted state to extract the user object
const parsedState = JSON.parse(persistedState);


let accessToken = null;

if (parsedState) {
    const currentUser = JSON.parse(parsedState.user).currentUser;
    
    if (currentUser) {
         accessToken = currentUser.accessToken;
    } else {
        console.error("Invalid persisted state format or missing access token.");
    }
} else {
    console.error("No persisted state found in localStorage.");
}


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});


export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${accessToken}`}
});
