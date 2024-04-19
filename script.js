// Initialize variables for the current input, previous input, and the operation
let currentInput = '';
let previousInput = '';
let operation = null;
// Access the screen element where results are displayed
const screen = document.getElementById('screen');

// Attach a click event listener to each button in the calculator
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Check if the button clicked is a number button
        if (btn.hasAttribute('data-number')) {
            appendNumber(btn.innerText); // Append the number to the current input
            updateDisplay(); // Update the calculator screen with the new input
        } else if (btn.hasAttribute('data-operation')) { // Check if the button is an operation
            chooseOperation(btn.innerText); // Set the operation
        }
    });
});

// Function to append a number to the current input
function appendNumber(number) {
    // Prevent multiple decimals in a number
    if (number === '.' && currentInput.includes('.')) return;
    // Append the number or decimal to the current input string
    currentInput += number;
    // Update the display after adding a number
    updateDisplay();
}

// Function to set the operation for the calculation
function chooseOperation(selectedOp) {
    // Prevent action if there's no input or trying to operate on empty input
    if (currentInput === '' && selectedOp !== 'C') return;
    // If there is an ongoing calculation, compute the result first
    if (operation && previousInput !== '') {
        compute();
    }

    // Handle specific operations
    if (selectedOp === 'C') {
        clear(); // Clear all inputs and operations
    } else if (selectedOp === '=') {
        compute(); // Perform the calculation
    } else {
        // Set the operation and move current input to previous input for the next number
        operation = selectedOp;
        previousInput = currentInput;
        currentInput = '';
    }
}

// Function to compute the calculation based on the operation
function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    // Ensure both numbers are valid
    if (isNaN(prev) || isNaN(curr)) return;

    // Perform operation based on the type (+, -, *, /)
    switch (operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = curr !== 0 ? prev / curr : "Error: Div by 0";
            break;
        default:
            return;
    }

    // Set the computed result as the current input for display
    currentInput = computation;
    operation = undefined;
    previousInput = '';
    // Update display with the result
    updateDisplay();
}

// Function to update the display screen of the calculator
function updateDisplay() {
    screen.innerText = currentInput;
}

// Function to clear all the inputs and operations
function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    // Clear the display
    updateDisplay();
}

