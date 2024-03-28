window.onload = function() {
    makeBoard(5);
    renderBoard();
}

// board

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
      const elementRow = document.createElement("div")
      elementRow.classList.add("row");
      
      row.forEach(function(column) {
        const tile = document.createElement("div")
        tile.classList.add("tile");
        elementRow.append(tile);
      });
      
      boardElement.append(elementRow)
    });
}

// buttons

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
    makeBoard(wordLength)
    renderBoard()
}

document.getElementById("make-board-button-3").addEventListener("click", handleThree)
document.getElementById("make-board-button-5").addEventListener("click", handleFive)
document.getElementById("make-board-button-7").addEventListener("click", handleSeven)

// keyboard

const keys = document.querySelectorAll(".keyboard-row button");
const tiles = document.querySelectorAll(".tile")

const dataKeys = Array.from(keys).map(function(button) {
    return button.getAttribute("data-key")
});

keys.forEach(function(button) {
    button.addEventListener("click", function(event) {
        const key = event.target.getAttribute("data-key")
        const index = dataKeys.indexOf(key); 
        if (dataKeys.includes(key)) {
            updateTile(index, key)
        console.log(key)
        }
    });
});

document.addEventListener("keydown", function(event) {
    const pressedKey = event.key.toLowerCase()
    const index = dataKeys.indexOf(pressedKey)
    if (dataKeys.includes(pressedKey)) {
        updateTile(dataKeys.indexOf(pressedKey), pressedKey)
        alert(pressedKey)
    }
});

// why is this not working?!? 

function updateTile(index, key) {
    if (index < tiles.length) {
        tiles[index].textContent = key
    }
}