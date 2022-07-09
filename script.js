let theme = localStorage.getItem("theme") || 1;
let themeCircles = document.querySelectorAll(".theme-circle");
let buttons = document.querySelectorAll(".key-container button");
let oldValue = document.querySelector(".old-value");
let result = document.querySelector(".result");
let currentNumber = "";
let oldNumber = "";
let operator;
// CHANGING AND STORING THEME
document.body.setAttribute("theme", theme);
themeCircles.forEach((themeCircle) => {
  if (themeCircle.value == theme) {
    themeCircle.setAttribute("checked", true);
  }
  themeCircle.addEventListener("change", (e) => {
    localStorage.setItem("theme", e.target.value);
    document.body.setAttribute("theme", e.target.value);
  });
});
// OPERATE CALCULATION
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.classList.contains("number")) {
      addToCurrentNumber(e.target.textContent);
      updateDisplay();
    } else if (e.target.classList.contains("operator")) {
      chooseOperation(e.target.textContent);
      updateDisplay();
    } else if (e.target.classList.contains("reset")) {
      reset();
      updateDisplay();
    } else if (e.target.classList.contains("equals")) {
      calculateOperation();
      updateDisplay();
    } else {
      deleteData();
      updateDisplay();
    }
  });
});

// functions
function addToCurrentNumber(value) {
  if (value == "." && currentNumber.includes(".")) return;
  currentNumber += value;
}
function chooseOperation(op) {
  if (currentNumber == "") {
    oldValue.textContent = "You have to type number first!";
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
}
function deleteData() {
  currentNumber = currentNumber.slice(0, currentNumber.length - 1);
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
  let integer = String(number).split(".")[0];
  let decimal = String(number).split(".")[1];
  let integerDisplay;
  integerDisplay = Number(integer).toLocaleString("en");
  if (decimal != null) {
    return `${integerDisplay}.${decimal}`;
  } else {
    return integerDisplay;
  }
}
function updateDisplay() {
  result.textContent = currentNumber;
  result.textContent = updateNumberFormat(currentNumber);
  operator !== undefined
    ? (oldValue.textContent = `${updateNumberFormat(oldNumber)} ${operator}`)
    : (oldValue.textContent = "");
}
