const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn, .btn-operator, .btn-equals');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

let currentInput = '';
let previousInput = '';
let operator = null;
let history = [];

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

  const prevRaw = previousInput;
  const currRaw = currentInput;
  const opRaw = operator;

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

  addHistoryEntry(prevRaw, opRaw, currRaw, result);

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

function renderHistory() {
  historyList.innerHTML = '';

  history.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('history__item');

    const row = document.createElement('div');
    row.classList.add('history__row');

    const label = document.createElement('span');
    label.classList.add('history__label');
    label.textContent = item.label;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('history__delete');
    deleteBtn.type = 'button';
    deleteBtn.textContent = '🗑';

    label.addEventListener('click', () => {
      loadHistoryItem(item);
    });

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      li.classList.add('history__item--removing');

      li.addEventListener('transitionend', () => {
        deleteHistoryEntry(index);
      }, { once: true });
    });

    row.appendChild(label);
    row.appendChild(deleteBtn);
    li.appendChild(row);
    historyList.appendChild(li);
  });
}

function addHistoryEntry(prev, op, curr, result) {
  const entry = {
    label: `${prev} ${op} ${curr} = ${result}`,
    result: result.toString()
  };

  history.unshift(entry);
  renderHistory();
}

function loadHistoryItem(item) {
  currentInput = item.result;
  previousInput = '';
  operator = null;

  if (typeof expression !== 'undefined') {
    expression.textContent = item.label;
  }

  updateDisplay();
}

clearHistoryBtn.addEventListener('click', () => {
  history = [];
  renderHistory();
});

document.addEventListener('keydown', e => {
  const key = e.key;

  if (!isNaN(key) || key === '.') handleNumber(key);
  if (['+', '-', '*', '/'].includes(key)) handleOperator(key);
  if (key === 'Enter' || key === '=') calculate();
  if (key === 'Backspace') deleteLast();
  if (key === 'Escape') clearAll();
});

function deleteHistoryEntry(index) {
  history.splice(index, 1);
  renderHistory();
}