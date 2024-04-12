// Game State

import { fiveWords } from "./data/fiveWords.js"

let word
let guessedWords = [[]]
let availableSpace = 1
let guessedWordCount = 0
const secretWords = fiveWords

// Model

function getWord() {
    const randomIndex = Math.floor(Math.random() * secretWords.length)
    return secretWords[randomIndex]
}

function updateTile(letter, index) {
    const isCorrectLetter = word.includes(letter)
    const letterInThatPosition = word.charAt(index)
    const isCorrectPosition = letter === letterInThatPosition

    if (!isCorrectLetter) {
        return "rgb(58, 58, 60)"
    }

    if (isCorrectPosition) {
        return "rgb(83, 141, 78)"
    }

    return "rgb(181, 159, 59)"
}

function checkWord(word) {
    return secretWords.includes(word)
}

// View

document.getElementById("game-rules").addEventListener("click", gameRules)

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

function createSquares() {
    const gameBoard = document.getElementById("board")

    for (let index = 0; index < 30; index++) {
        let square = document.createElement("div")
        square.classList.add("tile")
        square.setAttribute("id", index + 1)
        gameBoard.appendChild(square)
    }
}

function updateTileColors(letters) {
    const firstLetterId = guessedWordCount * 5 + 1

    letters.forEach(function (letter, index) {
        const tileColor = updateTile(letter, index)
        const letterId = firstLetterId + index
        const letterElement = document.getElementById(letterId)
        letterElement.style = `background-color:${tileColor};border-color:${tileColor}`
    })
}

// Controller

const keys = document.querySelectorAll(".keyboard-row button")

function handleKeys(letter) {
    if (letter === "↵") {
        submitWord()
        return
    }

    if (letter === "←") {
        removeLetter()
        return
    }

    updateGuessedWords(letter)
}

function gameOver() {
    for (let i = 0; i < keys.length; i++) {
        keys[i].disabled = true 
    }
}

function submitWord() {
    const currentWordArr = getCurrentWordArray()
    if (currentWordArr.length !== 5) {
        alert("The word must be 5 letters!")
        return
    }

    const currentWord = currentWordArr.join("")

    if (!checkWord(currentWord)) {
        alert("That is not a word!")
        return
    }

    updateTileColors(currentWordArr)

    guessedWordCount += 1

    if (currentWord === word) {
        alert(`Congratulations! The word is ${word}.`)
        gameOver()
        return
    }

    if (guessedWords.length === 6) {
        alert(`Sorry, you have no more guesses! The word is ${word}.`)
        gameOver()
        return
    }

    guessedWords.push([])
}

function removeLetter() {
    const currentWordArr = getCurrentWordArray()
    const removedLetter = currentWordArr.pop()

    guessedWords[guessedWords.length - 1] = currentWordArr

    const lastLetterElement = document.getElementById(String(availableSpace - 1))

    lastLetterElement.textContent = ""
    availableSpace = availableSpace - 1
}

for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = function (event) {
        const letter = event.target.getAttribute("data-key")
        handleKeys(letter)
    };
}

function getCurrentWordArray() {
    const numberOfGuessedWords = guessedWords.length
    return guessedWords[numberOfGuessedWords - 1]
}

function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArray()

    if (currentWordArr && currentWordArr.length < 5) {
        currentWordArr.push(letter)

        const availableSpaceElement = document.getElementById(String(availableSpace))

        availableSpace = availableSpace + 1
        availableSpaceElement.textContent = letter
    }
}

window.onload = function () {
    word = getWord()
    createSquares()
    console.log(word)
}