const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn, .btn-operator, .btn-equals');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const undoBar = document.getElementById('undoBar');
const undoText = document.getElementById('undoText');
const undoBtn = document.getElementById('undoBtn');
const themeToggle = document.getElementById('themeToggle');
const clickSound = new Audio('./click.mp3');
clickSound.volume = 0.4;

let currentInput = '';
let previousInput = '';
let operator = null;
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
let lastDeleted = null;
let undoTimerId = null;

const savedTheme = localStorage.getItem('calculatorTheme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    document.body.classList.add('light');
    localStorage.setItem('calculatorTheme', 'light');
  } else {
    document.body.classList.remove('light');
    localStorage.setItem('calculatorTheme', 'dark');
  }
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    playClickSound();

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

   li.classList.add('history__item--fading');

    function onFadeEnd(event) {
      if (event.propertyName !== 'opacity') return;
      li.removeEventListener('transitionend', onFadeEnd);
      li.classList.add('history__item--collapsing');

    function onCollapseEnd(event2) {
      if (event2.propertyName !== 'max-height') return;
      li.removeEventListener('transitionend', onCollapseEnd);
      deleteHistoryEntry(index);
    }
    li.addEventListener('transitionend', onCollapseEnd);
  }
  li.addEventListener('transitionend', onFadeEnd);
});

    row.appendChild(label);
    row.appendChild(deleteBtn);
    li.appendChild(row);
    historyList.appendChild(li);
  });
}

function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function addHistoryEntry(prev, op, curr, result) {
  const entry = {
    label: `${prev} ${op} ${curr} = ${result}`,
    result: result.toString()
  };

  history.unshift(entry);
  localStorage.setItem('calculatorHistory', JSON.stringify(history));
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

function showUndoBar(entry, index) {
  lastDeleted = [ entry, index ];

  undoText.textContent = `Deleted: ${entry.label}`;
   undoBar.hidden = false;

  if (undoTimerId !== null) {
    clearTimeout(undoTimerId);
  }

  undoTimerId = setTimeout(() => {
    hideUndoBar();
    lastDeleted = null;
  }, 5000);
}

function hideUndoBar() {
  undoBar.hidden = true;

  if (undoTimerId !== null) {
    clearTimeout(undoTimerId);
    undoTimerId = null;
  }
}

undoBtn.addEventListener('click', () => {
  if (!lastDeleted) return;

  const [entry, index] = lastDeleted;

  history.splice(index, 0, entry);
  localStorage.setItem('calculatorHistory', JSON.stringify(history));
  renderHistory();

  hideUndoBar();
  lastDeleted = null;
});

clearHistoryBtn.addEventListener('click', () => {
  history = [];
  localStorage.setItem('calculatorHistory', JSON.stringify(history));
  renderHistory();
});

document.addEventListener('keydown', e => {
  const key = e.key;

  if (!isNaN(key) || key === '.') {
    playClickSound();
    handleNumber(key);
  }

  if (['+', '-', '*', '/'].includes(key)) {
    playClickSound();
    handleOperator(key);
  }

  if (key === 'Enter' || key === '=') {
    playClickSound();
    calculate();
  }

  if (key === 'Backspace') {
    playClickSound();
    deleteLast();
  }

  if (key === 'Escape') {
    playClickSound();
    clearAll();
  }

  updateDisplay();
});

function deleteHistoryEntry(index) {
  const deletedEntry = history[index];

  history.splice(index, 1);
  localStorage.setItem('calculatorHistory', JSON.stringify(history));
  renderHistory();

  showUndoBar(deletedEntry, index);
}

// Load history on page load
renderHistory();