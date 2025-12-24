function validatePassword(password)
{
    const minlength = password.length >=8;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[@#$%^&*!]/.test(password);

    return minlength && upper && lower && number && special;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

function signup(){
    const username = document.getElementById("username").value.trim();
    const password= document.getElementById("password").value.trim();
    const msg = document.getElementById("message");

    if(!username || !password){
        msg.innerText = "All fields are required!";
        return;
    }
    if(!validatePassword(password)){
        msg.innerText = "Password must be 8+ chars, uppercase, lowercase, number & special char";
        return;
    }
    const exists = users.find(user => user.username === username);
    if(exists){
        msg.innerText = "User already exists!";
        return;
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
    window.location.href = "game.html";

}


function login(){
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("message");

    const user = users.find(user => user.username === username && user.password === password);   // return true if matches
    if(!user){
        msg.innerText = "Invalid username or password";
        document.getElementById("password").value = "";
        return;
    }

    localStorage.setItem("isLoggedIn" , "true");
    localStorage.setItem("currentUser" , username);
    window.location.href = "game.html";
}