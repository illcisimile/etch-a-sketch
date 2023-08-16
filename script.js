const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = '16';

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let mouseDown = false;

const grid = document.getElementById('grid');
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeRange = document.getElementById('sizeRange');

// used addeventlistener because the input range breaks on firefox
document.body.addEventListener('mousedown', () => (mouseDown = true));
document.body.addEventListener('mouseup', () => (mouseDown = false));

const setColor = (color) => (currentColor = color);
const setMode = (mode) => (currentMode = mode);
const setSize = (size) => (currentSize = size);

const setupGrid = (size) => createGrid(size);

const clearGrid = () => {
  grid.innerHTML = '';
  setupGrid(currentSize);
};

const createGrid = (size) => {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 1; i <= size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.style.border = '1px solid gray';
    gridElement.classList.add('individual-grid');
    gridElement.addEventListener('mouseover', changeColor);
    gridElement.addEventListener('mousedown', changeColor);
    grid.appendChild(gridElement);
  }
};

const changeColor = (e) => {
  if (e.type === 'mouseover' && !mouseDown) return;

  switch (currentMode) {
    case 'color':
      e.target.style.backgroundColor = currentColor;
      break;
    case 'eraser':
      e.target.style.backgroundColor = '#ffffff';
      break;
    default:
      e.target.style.backgroundColor = currentColor;
  }
};

const setActiveButton = (mode) => {
  switch (mode) {
    case 'color':
      eraserBtn.classList.remove('active');
      colorBtn.classList.add('active');
      break;
    case 'eraser':
      colorBtn.classList.remove('active');
      eraserBtn.classList.add('active');
      break;
  }
};

colorPicker.oninput = (e) => setColor(e.target.value);

colorBtn.onclick = () => {
  setMode('color');
  setActiveButton('color');
};

eraserBtn.onclick = () => {
  setMode('eraser');
  setActiveButton('eraser');
};

clearBtn.onclick = () => clearGrid();

sizeRange.onmousemove = (e) => {
  sizeValue.textContent = `${e.target.value} x ${e.target.value}`;
};

sizeRange.oninput = (e) => {
  setSize(e.target.value);
  clearGrid();
};

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  colorPicker.value = DEFAULT_COLOR;
  sizeRange.value = DEFAULT_SIZE;
};
