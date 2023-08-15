const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const setColor = (color) => (currentColor = color);
const setMode = (mode) => (currentMode = mode);

const changeColor = (e) => {
  if (e.type === 'mouseover' && !mouseDown) return;

  // const randomR = Math.floor(Math.random() * 256);
  // const randomG = Math.floor(Math.random() * 256);
  // const randomB = Math.floor(Math.random() * 256);

  // e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;

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

const setupGrid = (size) => createGrid(size);

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

const grid = document.getElementById('grid');

const colorPicker = document.getElementById('colorPicker');
colorPicker.oninput = (e) => setColor(e.target.value);

const colorBtn = document.getElementById('colorBtn');
colorBtn.onclick = () => setMode('color');

const eraserBtn = document.getElementById('eraserBtn');
eraserBtn.onclick = () => setMode('eraser');

// clears the grid
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  grid.innerHTML = '';
  setupGrid(DEFAULT_SIZE);
});

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  colorPicker.value = '#000000';
};
