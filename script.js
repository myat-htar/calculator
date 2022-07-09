let theme = localStorage.getItem("theme") || 1;
let themeCircles = document.querySelectorAll(".theme-circle");
let buttons = document.querySelectorAll(".key-container button");
let oldValue = document.querySelector(".old-value");
let resultValue = document.querySelector(".result");
let currentNumber = "";
let oldNumber = "";
let operator;
// CHANGING AND STORING THEME
document.body.setAttribute("data-theme", theme);
themeCircles.forEach((themeCircle) => {
  if (themeCircle.value == theme) {
    themeCircle.setAttribute("checked", "");
  }
  themeCircle.addEventListener("change", (e) => {
    localStorage.setItem("theme", e.target.value);
    document.body.setAttribute("data-theme", e.target.value);
  });
});
// OPERATE CALCULATION
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.classList.contains("number")) {
      addToCurrentNumber(e.target.textContent);
    } else if (e.target.classList.contains("operator")) {
      chooseOperation(e.target.textContent);
    } else if (e.target.classList.contains("reset")) {
      reset();
    } else if (e.target.classList.contains("equals")) {
      calculateOperation();
    } else {
      deleteData();
    }

    updateDisplay();
  });
});

// functions
function addToCurrentNumber(value) {
  if (value == "." && currentNumber.includes(".")) return;
  currentNumber += value;
}
function chooseOperation(op) {
  if (currentNumber == "") {
    return;
  }
  if (oldNumber !== "") calculateOperation();
  oldNumber = currentNumber;
  currentNumber = "";
  operator = op;
}
function reset() {
  currentNumber = "";
  oldNumber = "";
  operator = undefined;
}
function deleteData() {
  if (typeof currentNumber == "string")
    currentNumber = currentNumber.slice(0, -1);
}
function calculateOperation() {
  let result;
  if (!currentNumber || !oldNumber) return;
  currentNumber = parseFloat(currentNumber);
  oldNumber = parseFloat(oldNumber);
  switch (operator) {
    case "+":
      result = oldNumber + currentNumber;
      break;
    case "-":
      result = oldNumber - currentNumber;
      break;
    case "×":
    case "*":
      result = oldNumber * currentNumber;
      break;
    case "/":
      result = oldNumber / currentNumber;
      break;
  }
  currentNumber = result;
  oldNumber = "";
  operator = undefined;
}
function updateNumberFormat(number) {
  let integer = parseFloat(String(number).split(".")[0]);
  let decimal = String(number).split(".")[1];
  let integerDisplay;
  if (isNaN(integer)) {
    integerDisplay = "";
  } else {
    integerDisplay = integer.toLocaleString("en");
  }

  if (decimal != null) {
    return `${integerDisplay}.${decimal}`;
  } else {
    return integerDisplay;
  }
}
function updateDisplay() {
  resultValue.textContent = updateNumberFormat(currentNumber);
  operator !== undefined
    ? (oldValue.textContent = `${updateNumberFormat(oldNumber)} ${operator}`)
    : (oldValue.textContent = oldNumber);
}
// make calculations work with keyboard
document.addEventListener("keydown", (e) => {
  let numbers = /\d/;
  let operators = ["+", "-", "*", "/"];
  if (e.key.match(numbers) || e.key == ".") {
    addToCurrentNumber(e.key);
  } else if (operators.includes(e.key)) {
    chooseOperation(e.key);
  } else if (e.key === "=" || e.key === "Enter") {
    calculateOperation();
  } else if (e.key === "Delete") {
    e.shiftKey ? reset() : deleteData();
  }
  updateDisplay();
});
