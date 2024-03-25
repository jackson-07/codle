window.onload = function() {

    startGame();
}

function startGame() {
    const startBoard = document.getElementById("board");
    for (let i = 0; i < 30; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        startBoard.appendChild(tile);
    }
}