window.onload = function() {
    makeBoard(5);
    renderBoard();
}

const boardElement = document.querySelector("#board")
const selectDifficulty = document.querySelector(".make-board-button")
const startBoard = document.querySelector("#start-board")
let board = []

function makeBoard(wordLength) {
    board = []
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        const row = []
        for (let i = 0; i < wordLength; i++) {
          row.push("")
        }
        board.push(row)
      }
}

function renderBoard() {
    boardElement.innerHTML = "";
  
    board.forEach(function(row) {
      const elementRow = document.createElement("div");
      elementRow.classList.add("row");
      
      row.forEach(function(column) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        elementRow.append(tile);
      });
      
      boardElement.append(elementRow);
    });
}

function handleThree () {
    handleClick(3)
}

function handleFive () {
    handleClick(5)
}

function handleSeven () {
    handleClick(7)
}

function handleClick(wordLength) {
    makeBoard(wordLength);
    renderBoard();
}

document.getElementById("make-board-button-3").addEventListener("click", handleThree)
document.getElementById("make-board-button-5").addEventListener("click", handleFive)
document.getElementById("make-board-button-7").addEventListener("click", handleSeven)

const keys = document.querySelectorAll(".keyboard-row button");

for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = function(event) {
        const target = event.target;
        const key = target.getAttribute("data-key");
        console.log(key);
    };
}

