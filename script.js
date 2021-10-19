const grid = document.getElementById("grid");

function createGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 1; i <= size * size; i++) {
    const gridElement = document.createElement("div");
    // gridElement.style.border = "1px solid gray";
    gridElement.addEventListener("mouseenter", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  e.target.style.backgroundColor = "black";
}

createGrid(16);

// clears the grid
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  grid.innerHTML = "";
  createGrid(16);
});
