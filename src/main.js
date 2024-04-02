window.onload = function() {
    makeBoard()
    renderBoard()
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
    boardElement.innerHTML = ""
  
    board.forEach(function(row) {
      const elementRow = document.createElement("div")
      elementRow.classList.add("row");
      
      row.forEach(function(column) {
        const tile = document.createElement("div")
        tile.classList.add("tile")
        elementRow.append(tile)
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
            updateTile(index, key)
        alert(key)
        }
    });
});

document.addEventListener("keyup", function(event) {
    const pressedKey = event.key.toLowerCase()
    const index = dataKeys.indexOf(pressedKey)
    if (dataKeys.includes(pressedKey)) {
        updateTile(dataKeys.indexOf(pressedKey), pressedKey)
        alert(pressedKey)
    }
});

// game logic

/*

import {threeWords} from "./src/data/threeWords.js"
import {fiveWords} from "./src/data/fiveWords.js"
import {sevenWords} from "./src/data/sevenWords.js"

const secretThree = threeWords
const secretFive = fiveWords
const secretSeven = sevenWords

function secretWord() {
    let randomIndex
    let secret
    if (handleThree.checked) {
        randomIndex = Math.floor(Math.random() * secretThree.length)
        secret = secretThree[randomIndex]
    } else if (handleFive.checked) {
        randomIndex = Math.floor(Math.random() * secretFive.length)
        secret = secretFive[randomIndex]
    } else if (handleSeven.checked) {
        randomIndex = Math.floor(Math.random() * secretSeven.length)
        secret = secretSeven[randomIndex]
    }
}

*/

let guessedWords = [[]]
let availableSpace = 1
let guessedWordCount = 0

function getWordArray() {
    const wordArray = guessedWords.length
    return guessedWords[wordArray - 1]
}

function updateTile(letter) {
    const currentWord = getWordArray()

    if (currentWord && currentWord.length < 5) {
        currentWord.push(letter)

        const availableSpaceElement = document.getElementById(String(availableSpace))

        availableSpaceElement.textContent = letter
    }
}