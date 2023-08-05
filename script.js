let displayValue = '0';
let operator = '';
let previousValue = '';
let displayElement = document.getElementById('display');
let parenthesesMode = false;
let inputHistory = [];

function updateDisplay() {
    displayElement.innerText = inputHistory.join(' ');
}

function appendToDisplay(value) {
    if (displayValue === '0' || operator !== '') {
        displayValue = value;
    } else {
        displayValue += value;
    }

    // Store the input in inputHistory, except for 'C'
    if (value !== 'C') {
        inputHistory.push(displayValue);
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    previousValue = '';
    inputHistory = []; // Reset inputHistory without storing any value
    updateDisplay();
}

function backspace() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === '') {
        displayValue = '0';
    }
    inputHistory.pop(); // Remove the last input from inputHistory
    inputHistory.push(displayValue); // Add the updated value to inputHistory
    updateDisplay();
}

function operate(op) {
    if (operator !== '') {
        calculate();
    }
    operator = op;
    previousValue = displayValue;
    displayValue = '0';

    // Store the operator in inputHistory
    inputHistory.push(op);
    updateDisplay();
}

function calculate() {
    const currentValue = parseFloat(displayValue);
    const previous = parseFloat(previousValue);

    if (operator === '+') {
        displayValue = (previous + currentValue).toString();
    } else if (operator === '-') {
        displayValue = (previous - currentValue).toString();
    } else if (operator === '*') {
        displayValue = (previous * currentValue).toString();
    } else if (operator === '/') {
        displayValue = (previous / currentValue).toString();
    } else if (operator === '%') {
        displayValue = (previous * (currentValue / 100)).toString();
    }

    operator = '';
    previousValue = '';
    inputHistory.push('= ' + displayValue); // Store the result in inputHistory
    updateDisplay();
}

function toggleParentheses() {
    if (parenthesesMode) {
        appendToDisplay(')');
    } else {
        appendToDisplay('(');
    }
    parenthesesMode = !parenthesesMode;
}

function undo() {
    if (inputHistory.length > 1) {
        inputHistory.pop(); // Remove the last input from inputHistory
        displayValue = inputHistory[inputHistory.length - 1]; // Restore the previous input value
        updateDisplay();
    }
}

function addToHistory() {
    inputHistory.push(displayValue);
}

// Adding event listeners for button clicks
document.getElementById('display').addEventListener('click', addToHistory);
document.getElementById('undo').addEventListener('click', undo);

// Update the display on button clicks
document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (event) => {
        appendToDisplay(event.target.innerText);
    });
});
