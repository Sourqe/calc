// define all buttons and values
const digButt = Array.from(document.querySelectorAll('.digitButton'));
const funcButt = Array.from(document.querySelectorAll('.functionButton'));
const opButt = Array.from(document.querySelectorAll('.operatorButton'));
const decButt = document.querySelector('.decimalButton');
let displayValue = document.querySelector('#displayValue');
let operators = ['-', '+', '*', '/'];
let a = undefined;
let decimalPresent = false;
let negActive = false;

// set event listeners for the digit buttons
for (i = 0; i < digButt.length; i++) {
    // on a click event
    digButt[i].addEventListener('click', () => {
        if (displayValue.textContent.length < 13) {
            modifyDisplay(displayValue.textContent += event.target.value);
        }
    });
}

// set event listeners for the operators 
for (i = 0; i < opButt.length; i++) {
    opButt[i].addEventListener('click', () => {

        // in the case of subtraction
        if (event.target.value == 'subtract') {
            negActive = false;

            // intially
            if (a == undefined) {
                a = displayValue.textContent + '-';
                modifyDisplay(a);
                return a;
            }

            // after the initation
            if (a !== undefined) {
                if (checkEquation() == true) {
                    modifyDisplay(a + '-');
                } else {
                    a = eval(displayValue.textContent);
                    modifyDisplay(a + '-');
                    decimalPresent = false;
                    negActive = false;
                    return a;
                }
            }
        }

        // in the case of addition
        if (event.target.value == 'add') {
            negActive = false;

            if (a == undefined) {
                negActive = false;
                decimalPresent = false;
                a = displayValue.textContent;
                modifyDisplay(a + '+');
                return a;
            }

            if (a !== undefined) {
                if (checkEquation() == true) {
                    modifyDisplay(a + '+');
                } else {
                    decimalPresent = false;
                    negActive = false;
                    a = eval(displayValue.textContent);
                    modifyDisplay(a + '+');
                    return a;
                }
            }
        }

        // in the case of division
        if (event.target.value == 'divide') {
            negActive = false;

            if (a == undefined) {
                a = displayValue.textContent + '/';
                modifyDisplay(a);
                return a;
            }

            if (a !== undefined) {
                if (checkEquation() == true) {
                    modifyDisplay(a + '/');
                } else {
                    decimalPresent = false;
                    negActive = false;
                    a = eval(displayValue.textContent);
                    modifyDisplay(a + '/');
                    return a;
                }
            }
        }

        // in the case of multiplication
        if (event.target.value == 'multiply') {
            negActive = false;

            if (a == undefined) {
                a = displayValue.textContent + '*';
                modifyDisplay(a);
                return a;
            }

            if (a !== undefined) {
                if (checkEquation() == true) {
                    modifyDisplay(a + '*');
                } else {
                    a = eval(displayValue.textContent);
                    modifyDisplay(a + '*');
                    decimalPresent = false;
                    negActive = false;
                    return a;
                }
            }
        }

        // in the case of equals
        if (event.target.value == 'equals') {
            negActive = false;

            if (a !== undefined) {
                a = eval(displayValue.textContent);
                negActive = false;
                decimalPresent = false;
                modifyDisplay(a);
                return a;
            }
        }
    });
}

// add event listeners for the functions
for (i = 0; i < funcButt.length; i++) {
    funcButt[i].addEventListener('click', () => {

        // in the case of clear
        if (event.target.value == 'clr') {
            decimalPresent = false;
            negActive = false;
            a = undefined;
            b = undefined;
            modifyDisplay('');
        }

        // in the case of pos. neg.
        if (event.target.value == 'posneg') {
            if (negActive == false && a == undefined) {
                negActive = true;
                modifyDisplay('-' + displayValue.textContent);
                return;
            }

            if (negActive == true && a == undefined) {
                negActive = false;
                modifyDisplay(displayValue.textContent.substring(1));
                return;
            }

            if (negActive == false && a !== undefined) {
                negActive = true;
                modifyDisplay(displayValue.textContent.slice(0, a.length + 1) + '-' + displayValue.textContent.slice(a.length + 1));
                return;
            }

            if (negActive == true && a !== undefined) {
                negActive = false;
                modifyDisplay(displayValue.textContent.slice(0, a.length + 1) + displayValue.textContent.slice(a.length + 2));
                return;
            }

        }

        // in the case of percentage divide by 100
        if (event.target.value == 'percentage') {
            if (a == undefined) {
                a = Number(displayValue.textContent) / 100;
                modifyDisplay(a);
            } else {
                a = eval(displayValue.textContent) / 100;
                modifyDisplay(a);
            }
        }
    });
}

// set event listeners for decimals
decButt.addEventListener('click', () => {
    if (decimalPresent == false) {
        modifyDisplay(displayValue.textContent + '.');
        decimalPresent = true;
    }
});

// function that changes the result that is displayed
function modifyDisplay(displayText) {
    displayValue.textContent = displayText;
}

// check if we have an equation
function checkEquation() {
    for (i = 0; i < operators.length; i++) {
        if (displayValue.innerHTML.slice(-1) == operators[i]) {
            return true;
        } else {
            return false;
        }
    }
}	
