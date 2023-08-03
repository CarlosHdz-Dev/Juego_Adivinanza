const gridContainer = document.getElementById("gridContainer");
const attemptsSpan = document.getElementById("attempts");
let attempts = 3;
let targetNumber = generateRandomNumber(1, 9);

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrid() {
  for (let i = 1; i <= 9; i++) {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.textContent = i;
    gridItem.addEventListener("click", handleGuess);
    gridContainer.appendChild(gridItem);
  }
}

function handleGuess(event) {
  const selectedNumber = parseInt(event.target.textContent);

  if (selectedNumber === targetNumber) {
    Swal.fire(
      "Felicidades Ganaste!",
      "Acertaste el numero " + targetNumber,
      "success"
    );
    event.target.classList.add("selected");
    resetGame();
  } else {
    attempts--;
    attemptsSpan.textContent = attempts;

    if (attempts === 0) {
      Swal.fire({
        icon: "error",
        title: "Perdiste!",
        text: "Has agotado todos tus intentos! El numero era: " + targetNumber,
      });
      event.target.classList.add("selected");
      resetGame();
    } else {
      Swal.fire("Intentalo nuevamente.");
      event.target.classList.add("selected");
    }
  }
}

function resetGame() {
  targetNumber = generateRandomNumber(1, 9);
  attempts = 3;
  attemptsSpan.textContent = attempts;
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => item.classList.remove("selected"));
}

createGrid();
