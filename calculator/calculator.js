let numButtons = document.querySelectorAll(".num");
let operatorButtons = document.querySelectorAll(".operator");
let decimalButton = document.querySelector(".decimal");
let clearButton = document.querySelector(".clear");
let calculateButton = document.querySelector(".calculate");
let resultDisplay = document.querySelector(".result-container");
let del = document.querySelector(".delete");

// State
let operation = null;
let currentInput = '0';
let previousInput = '';

// ---------------- BUTTON EVENTS ----------------

// Number buttons
numButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (currentInput === '') return;
        chooseOperation(button.textContent);
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
    });
});

// Decimal
decimalButton.addEventListener("click", () => {
    appendDecimal();
    updateDisplay();
});

// Clear
clearButton.addEventListener("click", clearCalculator);

// Equal
calculateButton.addEventListener("click", calculateResult);

// Delete
del.addEventListener("click", handleDelete);

// ---------------- FUNCTIONS ----------------

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput = currentInput === '' ? '0.' : currentInput + '.';
    }
}

function chooseOperation(operator) {
    if (previousInput !== '') {
        calculateResult();
    }
    operation = operator;
    previousInput = currentInput;
}

function calculateResult() {
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                resultDisplay.textContent = "Infinity";
                setTimeout(clearCalculator, 1200);
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function handleDelete() {
    // Delete number
    if (currentInput !== '' && currentInput !== '0') {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') currentInput = '0';
    }
    // Delete operator
    else if (operation !== null) {
        operation = null;
        currentInput = previousInput;
        previousInput = '';
    }
    updateDisplay();
}

function updateDisplay() {
    if (operation !== null) {
        resultDisplay.textContent = `${previousInput} ${operation} ${currentInput}`;
    } else {
        resultDisplay.textContent = currentInput;
    }

    if (resultDisplay.textContent.length > 15) {
        resultDisplay.textContent = parseFloat(currentInput).toExponential(6);
    }
}

// ---------------- KEYBOARD SUPPORT ----------------

function handleKey(e) {
    const key = e.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
        updateDisplay();
        return;
    }

    if (key === '.') {
        appendDecimal();
        updateDisplay();
        return;
    }

    if (['+', '-', '*', '/'].includes(key)) {
        chooseOperation(key === '*' ? 'x' : key);
        previousInput = currentInput;
        currentInput = '';
        updateDisplay();
        return;
    }

    if (key === 'Enter' || key === '=') {
        calculateResult();
        return;
    }

    if (key === 'Backspace' || key === 'Delete') {
        handleDelete();
        return;
    }

    if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearCalculator();
        return;
    }
}

document.addEventListener("keydown", handleKey);
