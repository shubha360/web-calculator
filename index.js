const inputTextLimit = 18;

const inputText = document.querySelector(".screen .input");
const resultText = document.querySelector(".screen .result");
const acButton = document.querySelector(".buttons-div #ac");
const delButton = document.querySelector(".buttons-div #del");
const numberButtons = document.querySelectorAll(".buttons-div .number"); // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
const operatorButtons = document.querySelectorAll(".buttons-div .operator") // +, -, ×, ÷
const equalButton = document.querySelector(".buttons-div #equal");
const pointButton = document.querySelector(".buttons-div #point");

acButton.addEventListener("click", acFunction);
delButton.addEventListener("click", delFunction);
numberButtons.forEach(button => button.addEventListener("click", numberFunction));
operatorButtons	.forEach(button => button.addEventListener("click", operatorFunction));
equalButton.addEventListener("click", equalFunction);
pointButton.addEventListener("click", pointFunction);

// String values
var firstOperand;
var operator;
var secondOperand;
var result;

// Boolean values
var inputTextString;
var inFirstOperand;
var firstOperandHasNumber;
var secondOperandHasNumber;
var resultIsEmpty;

// To run at the start
reset();


function reset() {
	inputTextString = "";
	firstOperand = "";
	operator = "";
	secondOperand = "";
	result = 0;

	inFirstOperand = true;
	firstOperandHasNumber = false;
	secondOperandHasNumber = false;
	resultIsEmpty = true;
}

function acFunction() {
	
	inputText.textContent = "";
	resultText.textContent = "";

	reset();
}

function delFunction() {
	
	if (!resultIsEmpty) {
		reset();
		inputText.textContent = "";
	}

	if (inputTextString.length > 0) {
		
		// Deleting an operator
		if (inputTextString[inputTextString.length - 1] === " ") {
			inputTextString = inputTextString.substring(0, inputText.textContent.length - 3);
			operator = "";
			inFirstOperand = true;
		}

		// Deleting a number
		else {
			inputTextString = inputTextString.substring(0, inputText.textContent.length - 1);
			
			// Deleting a number from the second operand
			if (!inFirstOperand) {
				secondOperand = secondOperand.substring(0, secondOperand.length - 1);

				if (secondOperand.length === 0)
					secondOperandHasNumber = false;
			} 
			
			// Deleting a number from the first operand
			else {
				firstOperand = firstOperand.substring(0, secondOperand.length - 1);

				if (firstOperand.length === 0)
					firstOperandHasNumber = false;
			}
		}
		
		// Updating the text in the screen
		inputText.textContent = inputTextString;
	}
}


function numberFunction(event) {

	if (!resultIsEmpty)
		reset();

	if (inputTextString.length < 18) {
		
		const number = event.target.textContent;

		// Adding to the first operand
		if (inFirstOperand) {
			firstOperand += number;

			if (!firstOperandHasNumber)
				firstOperandHasNumber = true;

		} 
		
		// Adding to the second operand
		else {
			secondOperand += number;

			if (!secondOperandHasNumber)
				secondOperandHasNumber = true;
		}
		
		inputTextString += number;
		inputText.textContent = inputTextString;
	}
}

function operatorFunction(event) {

	const sign = event.target.textContent;

	if (inputTextString.length < 18) {

		// Makes first operand positive or negative by letting user type + or - at the start
		// Example +43 or -89
		if (inFirstOperand && firstOperand.length === 0 && (sign === "+" || sign === "-")) {
			firstOperand += sign;
			inputTextString += sign;
			inputText.textContent = inputTextString;
		}

		// Makes second operand positive or negative by letting user type + or - at the start
		// Example +43 or -89
		if (!inFirstOperand && secondOperand.length === 0 && (sign === "+" || sign === "-")) {
			secondOperand += sign;
			inputTextString += sign;
			inputText.textContent = inputTextString;
		}

		// Adding the main operator of the calculation
		if (inFirstOperand && firstOperandHasNumber) {
			operator = sign;
			inFirstOperand = false;
			inputTextString += " " + sign + " ";
			inputText.textContent = inputTextString;
		}
	}

	// Triggering the calculate function if an operator button and both operands have number
	if (!inFirstOperand && secondOperandHasNumber) {
		equalFunction();

		// Pressing an operator button immediately after calculating
		// Previous result becomes first operand for the new calculation
		firstOperand = resultText.textContent;
		operator = sign;
		secondOperand = "";

		inFirstOperand = false;
		firstOperandHasNumber = true;
		secondOperandHasNumber = false;
		resultIsEmpty = true;

		inputTextString = firstOperand + " " + operator + " ";
		inputText.textContent = inputTextString;
	}
}

function equalFunction() {

	if (firstOperandHasNumber && secondOperandHasNumber) {
		result = calculate(firstOperand, secondOperand, operator);

		result = Math.round((result + Number.EPSILON) * 100) / 100

		resultText.textContent = result;
		resultIsEmpty = false;
	}
}

function pointFunction() {

	if (!resultIsEmpty)
		reset();

	if (inputTextString.length < 18) {
		
		// Prevents user from inserting more than one point in the first operand
		if (inFirstOperand && firstOperand.indexOf(".") === -1) {
			firstOperand += ".";
			inputTextString += ".";
			inputText.textContent = inputTextString;
		}

		// Prevents user from inserting more than one point in the first operand
		else if (!inFirstOperand && secondOperand.indexOf(".") === -1) {
			secondOperand += ".";
			inputTextString += ".";
			inputText.textContent = inputTextString;
		}
	}
}

function calculate(first, second, operator) {

	const firstNumber = Number(first);
	const secondNumber = Number(second);

	switch (operator) {

		case "+":
			return result = add(firstNumber, secondNumber);

		case "-":
			return result = subtract(firstNumber, secondNumber);
		
		case "×":
			return result = multiply(firstNumber, secondNumber);

		case "÷":
			return result = divide(firstNumber, secondNumber);
	}
}

const add = (first, second) => first + second;
const subtract = (first, second) => first - second;
const multiply = (first, second) => first * second;
const divide = (first, second) => first / second;


// Configuring for keyboard

window.addEventListener('keydown', (event) => {
    
	switch (event.key) {
        
        case "Tab":
            event.preventDefault();
            break;
        
		case "Escape":
            event.preventDefault();
			acButton.click();
			break;

		case "Backspace":
		case "Delete":
            event.preventDefault();            
			delButton.click();
			break;

		case "=":
		case "Enter":
            event.preventDefault();
			equalButton.click();
			break;
            
        case "." :
            event.preventDefault();
            pointButton.click();
            break;
            
        case "+":
        case "-":
        case "*":
        case "/":
            event.preventDefault();
			
			// Converting the ×, ÷ to normal keyboard signs *, /
			// So that the event.keys are recognized
			const sign = event.key === "*" ? "×" : event.key === "/" ? "÷" : event.key;
			
			operatorButtons.forEach(button => {
				
				if (button.textContent === sign) {
					button.click();
				}
			});
            break;
			
		case "0":
        case "1":
        case "2":
        case "3":
		case "4":
        case "5":
        case "6":
        case "7":
		case "8":
        case "9":
			event.preventDefault();
			
			numberButtons.forEach(button => {
				
				if (button.textContent === event.key) {
					button.click();
				}
			});
			break;
	}	
});