/* Variables */

import { threeWords } from "./data/threeWords.js"
import { fiveWords } from "./data/fiveWords.js"
import { sevenWords } from "./data/sevenWords.js"

const secretThree = threeWords
const secretFive = fiveWords
const secretSeven = sevenWords

const boardElement = document.querySelector("#board")
const keys = document.querySelectorAll(".keyboard-row button")
const tiles = document.querySelectorAll(".tile")

document.getElementById("game-rules").addEventListener("click", gameRules)
document.getElementById("make-board-button-3").addEventListener("click", handleThree)
document.getElementById("make-board-button-5").addEventListener("click", handleFive)
document.getElementById("make-board-button-7").addEventListener("click", handleSeven)

/* State */

let board = []
let guessedWords = [[]]
let rowIndex = 0
const secret = secretWord(5)

/* Functions */

// board

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

    board.forEach(function (row, rowIndex) {
        const elementRow = document.createElement("div")
        elementRow.classList.add("row");

        row.forEach(function (column, columnIndex) {
            const tile = document.createElement("div")
            tile.classList.add("tile")
            tile.id = rowIndex + "-" + columnIndex
            elementRow.append(tile)
            if (rowIndex === 0 && columnIndex === guessedWords) {
                tile.textContent = ""
            }

        })

        boardElement.append(elementRow)

    })
}

// buttons

// modal

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

// retrieve secret word

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
    return secret
}

// start game 

function startGame(wordLength) {
    makeBoard(wordLength)
    renderBoard()

}

function handleThree() {
    startGame(3)
    secretWord(3)
}

function handleFive() {
    startGame(5)
    secretWord(5)
}

function handleSeven() {
    startGame(7)
    secretWord(7)
}

// keyboard

const dataKeys = Array.from(keys).map(function (button) {
    return button.getAttribute("data-key")
})

keys.forEach(function (button) {
    button.addEventListener("click", function (event) {
        const key = event.target.getAttribute("data-key")
        const index = dataKeys.indexOf(key)
        if (dataKeys.includes(key)) {
            updateTile(key)
        }
    })
})

// display on the grid

function updateTile(letter) {
    const currentWord = guessedWords[guessedWords.length - 1]

    console.log(currentWord)

    if (currentWord && currentWord.length <= 5) {
        console.log("branch1")
        if (letter === "←" && guessedWords.length > 0) {
            console.log("branch1b")
            const columnIndex = currentWord.length - 1
            const tileId = `${rowIndex}-${columnIndex}`
            const tile = document.getElementById(tileId)
            currentWord.pop()
            tile.textContent = ""
        }

        else if (letter === "↵" && currentWord.length === 5) {
            console.log("branch2")
            submitWord(5)
            guessedWords.push([])
            rowIndex++
        }

        else {
            console.log("branch3")
            const columnIndex = currentWord.length
            const tileId = `${rowIndex}-${columnIndex}`
            const tile = document.getElementById(tileId)
            tile.textContent = letter
            currentWord.push(letter)
        }
    }
}

// submit a word to guess

function submitWord() {
    const currentWord = guessedWords[guessedWords.length - 1]

    const notWord = !threeWords.includes(currentWord.join("")) && !fiveWords.includes(currentWord.join("")) && !sevenWords.includes(currentWord.join(""))
    if (notWord) {
        alert("That is not a word!")
    }

    if (currentWord.join("") === secret) {
        alert("Congratulations, you won!")

    }
    console.log(currentWord)
    for (let i = 0; i < currentWord.length; i++) {
        const letter = currentWord[i]
        const tileId = `${rowIndex}-${i}`
        const tile = document.getElementById(tileId)
        console.log(letter, tile, tileId)
        if (secret.includes(letter)) {
            const position = secret.indexOf(letter)
            if (position === i) {
                tile.style.backgroundColor = "rgb(83, 141, 78)"
            } else {
                tile.style.backgroundColor = "rgb(181, 159, 59)"
            }
        } else {
            tile.style.backgroundColor = "rgb(58, 58, 60)"

        }
    }
}

window.onload = function () {
    makeBoard(5)
    renderBoard()
}

/*
TODO LIST:
- add end of game at end of guesses
- add reset to startGame function
- add modal for winning and losing
*/