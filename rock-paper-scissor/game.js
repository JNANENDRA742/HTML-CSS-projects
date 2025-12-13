// 🔐 AUTH GUARD — must be first
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "signup-login.html";
}

// 👤 Get current user
let currentUser = localStorage.getItem("currentUser");

// 🧑 Welcome message
document.getElementById("welcome").innerText =
    `Welcome, ${currentUser}! 👋`;

// 🎮 Computer choice
function getComputerChoice() {
    const choices = ["rock", "paper", "scissor"];
    return choices[Math.floor(Math.random() * choices.length)];
}

// 📊 Load user-specific scores
let scores = JSON.parse(
    localStorage.getItem(`scores_${currentUser}`)
) || {
    win: 0,
    lose: 0,
    tie: 0
};

// 💾 Save score
function saveScore() {
    localStorage.setItem(`scores_${currentUser}`, JSON.stringify(scores));
}

// ▶️ Play game
function playgame(userChoice) {
    const computerChoice = getComputerChoice();
    let resultText = "";

    if (userChoice === "rock") {
        if (computerChoice === "scissor") {
            scores.win++;
            resultText = "You Win 🎉";
        } else if (computerChoice === "paper") {
            scores.lose++;
            resultText = "You Lose 😢";
        } else {
            scores.tie++;
            resultText = "It's a Tie 😐";
        }
    } 
    else if (userChoice === "paper") {
        if (computerChoice === "rock") {
            scores.win++;
            resultText = "You Win 🎉";
        } else if (computerChoice === "scissor") {
            scores.lose++;
            resultText = "You Lose 😢";
        } else {
            scores.tie++;
            resultText = "It's a Tie 😐";
        }
    } 
    else {
        if (computerChoice === "paper") {
            scores.win++;
            resultText = "You Win 🎉";
        } else if (computerChoice === "rock") {
            scores.lose++;
            resultText = "You Lose 😢";
        } else {
            scores.tie++;
            resultText = "It's a Tie 😐";
        }
    }

    saveScore();
    updateScore();
    updateResult(userChoice, computerChoice, resultText);
}

// 🖥️ Update result text
function updateResult(userChoice, computerChoice, resultText) {
    document.getElementById("user-choice").innerText = `User: ${userChoice}`;
    document.getElementById("computer-choice").innerText = `Computer: ${computerChoice}`;
    document.getElementById("result").innerText = `Result: ${resultText}`;
}

// 📈 Update score UI
function updateScore() {
    document.getElementById("win").innerText = scores.win;
    document.getElementById("lose").innerText = scores.lose;
    document.getElementById("tie").innerText = scores.tie;
}

// 🔄 Reset score
function resetScore() {
    scores.win = scores.lose = scores.tie = 0;
    saveScore();
    updateScore();

    document.getElementById("user-choice").innerText = "User: -";
    document.getElementById("computer-choice").innerText = "Computer: -";
    document.getElementById("result").innerText = "Result: -";
}

// 🚪 Logout with confirmation
function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "signup-login.html";
    }
}

// 🔁 Load score on page refresh
updateScore();
