


const inputText = document.querySelector(".screen .input");
const resultText = document.querySelector(".screen .result");
const acButton = document.querySelector(".buttons-div #ac");
const delButton = document.querySelector(".buttons-div #del");
const numberButtons = document.querySelectorAll(".buttons-div .number");

inputText.textContent = "";

acButton.addEventListener("click", acFunction);
delButton.addEventListener("click", delFunction);
numberButtons.forEach(button => button.addEventListener("click", numberFunction));


function acFunction() {
	inputText.textContent = "";
	resultText.textContent = "";
}

function delFunction() {}


function numberFunction(e) {
	inputText.textContent += getNumber(e.target.getAttribute("id"));
}

function getNumber(str) {
	
	switch (str) {
		
		case "one":
			return 1;
			
		case "two":
			return 2;
			
		case "three":
			return 3;
			
		case "four":
			return 4;
			
		case "five":
			return 5;
			
		case "six":
			return 6;
			
		case "seven":
			return 7;
			
		case "eight":
			return 8;
			
		case "nine":
			return 9;
			
		case "zero":
			return 0;
	}
}