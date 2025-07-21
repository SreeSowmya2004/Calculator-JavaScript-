const display = document.getElementById('display');
const history = document.getElementById('history');
let current = '0';

function append(value) {
  if (display.innerText === '0' || display.innerText === 'Error') {
    current = value;
  } else {
    current += value;
  }
  display.innerText = current;
}

function clearDisplay() {
  current = '0';
  display.innerText = current;
  history.innerText = '';
}

function deleteLast() {
  current = current.slice(0, -1);
  if (!current) current = '0';
  display.innerText = current;
}

function calculate() {
  try {
    const input = current.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100');
    const result = Function('"use strict";return (' + input + ')')();
    history.innerText = current;
    current = result.toString();
    display.innerText = current;
  } catch {
    display.innerText = 'Error';
    current = '0';
  }
}

function toggleMode() {
  document.body.classList.toggle('light');
}

function toggleSign() {
  if (current.startsWith('-')) {
    current = current.slice(1);
  } else if (current !== '0') {
    current = '-' + current;
  }
  display.innerText = current;
}

function advanced(type) {
  try {
    let value = parseFloat(current);
    let result;

    switch (type) {
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = Math.pow(value, 2);
        break;
      case 'reciprocal':
        result = 1 / value;
        break;
      case 'sin':
        result = Math.sin(value * Math.PI / 180); // degrees to radians
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      default:
        result = value;
    }

    history.innerText = `${type}(${current})`;
    current = result.toString();
    display.innerText = current;
  } catch {
    display.innerText = 'Error';
    current = '0';
  }
}
