const rowCount = 15
const columnCount = 15
const boxSize = 25

const mines = 50

let gamemode = "easy";

function onChangeMode() { }

const minefield = document.getElementById("minefield");

minefield.style.setProperty("--rowCount", rowCount)
minefield.style.setProperty("--columnCount", columnCount)
minefield.style.setProperty("--boxSize", boxSize + "px")

window.onload = function () {
    setGrid(mines);
};

/**
 * Generates the minefield grid by creating divs in the minefiled div and giving them ids
 */
function setGrid(mines) {
    for (let i = 0; i < rowCount * columnCount; i++) {
        let tile = document.createElement("div");

        if (Math.round(Math.random() / 1.5) && mines) {
            tile.hasMine = true;
            mines--
        }
        else {
            tile.hasMine = false;
        }

        tile.id = i.toString();

        tile.addEventListener("mousedown", (event) => {
            onTileClicked(event)
        })

        minefield.appendChild(tile);
    }
}

/**
 * Eventlistener function
 */
function onTileClicked(event) {
    const id = event.currentTarget.id
    const hasMine = event.currentTarget.hasMine

    const tile = document.getElementById(id)

    if (hasMine) {
        tile.style.backgroundColor = "red"
        location.reload()
    }
    else {
        tile.style.backgroundColor = "green"
    }
}