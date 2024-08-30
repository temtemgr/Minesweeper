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
window.oncontextmenu = function (event) {
    const id = event.target.id

    if (id === 0 || id) {
        event.preventDefault()
        return false;     // cancel default menu
    }
}

/**
 * Generates the minefield grid by creating divs in the minefiled div and giving them ids
 * @param {Int} mines 
 */
function setGrid(mines) {
    for (let i = 0; i < rowCount * columnCount; i++) {
        let tile = document.createElement("div");
        tile.hasFlag = false;
        tile.revealed = false;

        if (Math.round(Math.random() / 1.5) && mines) {
            tile.hasMine = true;
            mines--
        }
        else {
            tile.hasMine = false;
        }
        tile.id = i.toString();

        tile.addEventListener("mousedown", (event) => {
            onMouseDown(event)
        })

        minefield.appendChild(tile);
    }
}

/**
 * Handles mouse down event
 * @param {*} event 
 */
function onMouseDown(event) {
    const btn = event.button;

    if (btn === 0) {
        onTileLeftClicked(event)
    }
    if (btn === 2) {
        onTileRightClicked(event)
    }
}


/**
 * Handles left click event
 * @param {object} event 
 */
function onTileLeftClicked(event) {
    const flag = event.currentTarget.hasFlag
    if (flag) {return}
    
    const id = event.currentTarget.id
    const hasMine = event.currentTarget.hasMine
    let tile = document.getElementById(id)

    event.currentTarget.revealed = true

    if (hasMine) {
        tile.style.backgroundColor = "red"
        location.reload()
    }
    else {
        tile.style.backgroundColor = "darkgrey"

    }
}

/**
 * Handles right click event
 * @param {object} event 
 */
function onTileRightClicked(event) {
    const id = event.currentTarget.id
    const isRevealed = event.currentTarget.revealed
    let flag = event.currentTarget.hasFlag
    let tile = document.getElementById(id)

    if (flag) {
        event.currentTarget.hasFlag = false
        tile.style.backgroundImage = ""
    }
    if (!isRevealed && !flag) {
        event.currentTarget.hasFlag = true
        tile.style.backgroundImage = "url('./sprites/red-flag.png')"
    }
}