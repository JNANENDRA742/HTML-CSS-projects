const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");
const togglePassword = document.getElementById("toggle-password");
const form = document.querySelector("form");


const errorName = document.querySelector(".error-name");
const errorEmail = document.querySelector(".error-email");
const errorPassword = document.querySelector(".error-password");
const errorPhone = document.querySelector(".error-phone");


const successBtn = document.getElementById("success-popup");
const successMessage = document.getElementById("success-message");
const closepopup = document.getElementById("close-popup");


function validateName(){

    const nameBox = nameInput.parentElement;
    nameBox.classList.remove("error", "success");

    let name = nameInput.value.trim();
    if(name===""){
        errorName.innerHTML = "Please Enter Your Name!";
        return false;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if(!nameRegex.test(name)){
        errorName.innerHTML = "Name should only contain letters and spaces!";
        nameBox.classList.add("error");
        return false;
    }
    errorName.innerHTML = "✅";
    nameBox.classList.add("success");
    return true;
}
function validateEmail(){

    const emailBox = emailInput.parentElement;
    emailBox.classList.remove("error","success");
    let email = emailInput.value.trim();
    if(email===""){
        errorEmail.innerHTML = "Please Enter Your Email-Id!";
        return false;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(!emailRegex.test(email)){
        errorEmail.innerHTML = "Invalid email format!";
        emailBox.classList.add("error");
        return false;
    }
    errorEmail.innerHTML = "✅";
    emailBox.classList.add("success");
    return true;
}
function validatePassword(){
    const passwordBox = passwordInput.parentElement;
    passwordBox.classList.remove("error","success");
    let password = passwordInput.value.trim();
    if(password===""){
        errorPassword.innerHTML = "Please Enter Your Password!";
        return false;
    }
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorPassword.innerHTML =
            "Password must contain uppercase, lowercase, number & special character!";
            passwordBox.classList.add("error");
        return false;
    }
    errorPassword.innerHTML = "✅";
    passwordBox.classList.add("success");
    return true;
}
function validatePhone(){
    const phoneBox = phoneInput.parentElement;
    phoneBox.classList.remove("error","success");
    let phone = phoneInput.value.trim();

    if(phone === ""){
        errorPhone.innerHTML = "Please enter a phone number";
        return false;
    }

    const phoneRegex = /^\d{10}$/;
    if(!phoneRegex.test(phone)){
        errorPhone.innerHTML = "Phone number must be exactly 10 digits!";
        phoneBox.classList.add("error");
        return false;
    }

    errorPhone.innerHTML = "✅";
    phoneBox.classList.add("success");
    return true;
}


togglePassword.addEventListener("click" , ()=>{
    if(passwordInput.type === "password"){
        passwordInput.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
    else{
        passwordInput.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // qr code will depends on Email and current form submition time
    const uniqueData = `Email:${email}|Time:${Date.now()}`;


    // let isValid = validateName() && validateEmail() && validatePassword() && validatePhone();
    let isValid = validateName() & validateEmail() & validatePassword() & validatePhone();

    if (!isValid) 
    {
        // shake if user clicks submit button without filling , if we don't want this , then remove the below comments
        form.classList.add("shake");
        // remove class after animation
        setTimeout(() => {
            form.classList.remove("shake");
        }, 400);

        return;
    }
    form.style.display = "none";
    successBtn.classList.add("show");
    displaysuccessMessage();

    generateQRCode(uniqueData);

    form.reset();

    errorName.innerHTML = "";
    errorEmail.innerHTML = "";
    errorPassword.innerHTML = "";
    errorPhone.innerHTML = "";

    document.querySelectorAll(".input-box").forEach(box => {
    box.classList.remove("error", "success");
    });

});

// ✅ Form submitted successfully!
function displaysuccessMessage(){

    successMessage.innerText = `Dear ${nameInput.value}\nYour form has been submitted successfully!\nAnd here is Your One Time Valid QR Code\n`;
}

closepopup.addEventListener("click" , ()=>{
    form.style.display = "flex";
    successBtn.classList.remove("show");
});



/* 🔴 LIVE VALIDATION */
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
phoneInput.addEventListener("input", validatePhone);




// light and Dark Theme
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeIcon.className = "fa-solid fa-sun";
    } else {
        themeIcon.className = "fa-solid fa-moon";
    }
});


// QR Code   and we are also modifying submit function
function generateQRCode(userData) {
    const qrCode = document.getElementById("qr-code");
    qrCode.innerHTML = ""; // clear previous QR

    new QRCode(qrCode, {
        text: userData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

}
