window.onload = function() {
    makeBoard(5)
    renderBoard()
    secretWord()
}

// board

const boardElement = document.querySelector("#board")
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
    boardElement.innerHTML = ""
  
    board.forEach(function(row, rowIndex) {
      const elementRow = document.createElement("div")
      elementRow.classList.add("row");
      
      row.forEach(function(column, columnIndex) {
        const tile = document.createElement("div")
        tile.classList.add("tile")
        tile.id = rowIndex + "-" + columnIndex
        elementRow.append(tile)
        if (rowIndex === 0 && columnIndex === guessedWordCount) {
            tile.textContent = ""
        }

      });
      
      boardElement.append(elementRow)
    });
}

// buttons

function gameRules() {
    document.getElementById("gameModal").style.display = "block"
    window.onclick = function (event) {
        const modal = document.getElementById("gameModal")
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }
    document.getElementsByClassName("close")[0].onclick = function () {
        document.getElementById("gameModal").style.display = "none"
    }
}

function handleThree () {
    handleClick(3)
    secretWord(3)
}

function handleFive () {
    handleClick(5)
    secretWord(5)
}

function handleSeven () {
    handleClick(7)
    secretWord(7)
}

function handleClick(wordLength) {
    makeBoard(wordLength)
    renderBoard()
}

document.getElementById("game-rules").addEventListener("click", gameRules)
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
            updateTile(key)
        console.log(key)
        }
    });
});

document.addEventListener("keyup", function(event) {
    const pressedKey = event.key.toLowerCase()
    const index = dataKeys.indexOf(pressedKey)
    if (dataKeys.includes(pressedKey)) {
        updateTile(pressedKey)
        console.log(pressedKey)
    }
});

// game logic

import {threeWords} from "./data/threeWords.js"
import {fiveWords} from "./data/fiveWords.js"
import {sevenWords} from "./data/sevenWords.js"

const secretThree = threeWords
const secretFive = fiveWords
const secretSeven = sevenWords

function secretWord(wordLength) {
    let randomIndex
    let secret
    if (wordLength === 3) {
        randomIndex = Math.floor(Math.random() * secretThree.length)
        secret = secretThree[randomIndex]
        console.log(secret)
    } else if (wordLength === 5) {
        randomIndex = Math.floor(Math.random() * secretFive.length)
        secret = secretFive[randomIndex]
        console.log(secret)
    } else if (wordLength === 7) {
        randomIndex = Math.floor(Math.random() * secretSeven.length)
        secret = secretSeven[randomIndex]
        console.log(secret)
    }
}

let guessedWords = [[]]
let guessedWordCount = 0

function updateTile(letter) {
    const currentWord = guessedWords[guessedWords.length - 1]
    if (currentWord && currentWord.length <= 5) {
        const rowIndex = guessedWordCount
        const columnIndex = currentWord.length
        const tileId = `${rowIndex}-${columnIndex}`
        const tile = document.getElementById(tileId)
        if (tile) {
            tile.textContent = letter
            currentWord.push(letter)
        }
        if (letter === "↵" && columnIndex === 5) {
            guessedWords.push([])
            guessedWordCount++
        }
        if (letter === "←" && guessedWords.length > 0) {
            guessedWords.pop([])
        }
    }
}

/*
TODO LIST:
- add submit word function with english word catcher
- add tilecolor function for divs and keyboards
- add alert or modal for winning or losing
- add game reset to handleclick functions
- clean the code
*/