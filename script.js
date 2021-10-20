const grid = document.getElementById("grid");

// clears the grid
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  grid.innerHTML = "";
  setupGrid();
});

function createGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 1; i <= size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.addEventListener("mouseover", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function setupGrid() {
  gridSize = window.prompt("Input grid size:");
  createGrid(gridSize);
}

setupGrid();
