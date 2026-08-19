const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("button");

let expression = "";

function updateDisplay() {
    expressionDisplay.textContent = expression || "0";

    if (!expression) {
        resultDisplay.textContent = "";
        return;
    }

    try {
        const value = calculateResult(expression);

        if (value !== null && isFinite(value)) {
            resultDisplay.textContent = value;
        } else {
            resultDisplay.textContent = "";
        }
    } catch {
        resultDisplay.textContent = "";
    }
}

function calculateResult(exp) {
    // Convert percentage
    exp = exp.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

    // Allow only calculator characters
    if (!/^[0-9+\-*/().%\s]+$/.test(exp)) {
        throw new Error("Invalid input");
    }

    // Prevent incomplete expressions
    if (/[+\-*/.]$/.test(exp)) {
        return null;
    }

    return Function('"use strict"; return (' + exp + ')')();
}

function addValue(value) {
    expression += value;
    updateDisplay();
}

function clearCalculator() {
    expression = "";
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        const result = calculateResult(expression);

        if (result === null || !isFinite(result)) {
            resultDisplay.textContent = "Error";
            return;
        }

        expression = String(result);
        expressionDisplay.textContent = expression;
        resultDisplay.textContent = result;
    } catch {
        resultDisplay.textContent = "Error";
    }
}

// Button click handling
buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value !== undefined) {
            addValue(value);
        }

        if (action === "clear") {
            clearCalculator();
        }

        if (action === "delete") {
            deleteLast();
        }

        if (action === "calculate") {
            calculate();
        }
    });
});

// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers and operators
    if (
        /[0-9+\-*/.%]/.test(key)
    ) {
        addValue(key);
    }

    // Enter or =
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Backspace
    else if (key === "Backspace") {
        deleteLast();
    }

    // Escape
    else if (key === "Escape") {
        clearCalculator();
    }

    // Prevent unwanted browser behavior
    if (
        ["Enter", "Backspace", "Escape"].includes(key)
    ) {
        event.preventDefault();
    }
});

updateDisplay();