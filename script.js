const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn, .btn-operator, .btn-equals');
let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        const action = button.dataset.action;
        const op = button.dataset.operator;

        if (button.classList.contains('number')) {
            handleNumber(value);
        } else if (op) {
            handleOperator(op);
        } else if (action === 'equal') {
            calculate();
        } else if (action === 'clear') {
            clearAll();
        } else if (action === 'delete') {
            deleteLast();
        }

        updateDisplay();
    });
});

function handleNumber(value) {
    if (value === "." && currentInput.includes('.')) return;
    currentInput += value;
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
  if (operator === null || currentInput === '' || previousInput === '') return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  let result = 0;
  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = curr === 0 ? 'Error' : prev / curr;
      break;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
} 

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
}

function updateDisplay() {
    display.textContent = currentInput || previousInput || '0';
}

document.addEventListener('keydown', e => {
  const key = e.key;

  if (!isNaN(key) || key === '.') handleNumber(key);
  if (['+', '-', '*', '/'].includes(key)) handleOperator(key);
  if (key === 'Enter' || key === '=') calculate();
  if (key === 'Backspace') deleteLast();
  if (key === 'Escape') clearAll();

  updateDisplay();
});