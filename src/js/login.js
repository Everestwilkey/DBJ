import { getParam , renderHeaderFooter } from "./utils.mjs";


function lockIn() {
    
}

renderHeaderFooter();
const redirect = getParam("redirect")
// const loginButton = 

document.querySelector("#loginButton").addEventListener ("click",  () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    // Pass those to the login function along with the redirect information we gathered above. 
});
