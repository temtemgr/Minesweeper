const rowCount = 15
const columnCount = 15
const boxSize = 25

const mines = 20

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
        tile.MineCounter = 0;

        if (Math.round(Math.random() / 1.8) && mines) {
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
    setTileNumbers()
}

/**
 * Sets the tile numbers on the minefield
 */
function setTileNumbers() {
    for (let i = 0; i < rowCount * columnCount; i++) {

        if (document.getElementById(i).hasMine) {
            AddMineCounter(i)
        }
    }
}

/**
 * Sets Minecounter + 1 for the tiles around
 * @param {Integer} tileID 
 */
function AddMineCounter(tileID) {
    getTileIdsAroundTile(tileID).forEach((tile) => {
        document.getElementById(tile).MineCounter++
    });
}

/**
 * Gets the tile ids around the tile
 * @param {Integer} tileID 
 * @returns {Array} of surrouded tile ids
 */
function getTileIdsAroundTile(tileID) {
    let tiles = [];

    // top left corner
    if (tileID == 0) {
        tiles.push(tileID + 1);
        tiles.push(tileID + columnCount);
        tiles.push(tileID + columnCount + 1);

        return tiles
    }
    // top right corner
    if (tileID == (columnCount - 1)) {
        tiles.push(tileID + columnCount);
        tiles.push(tileID + columnCount - 1);
        tiles.push(tileID - 1);

        return tiles
    }
    // bottom right corner
    if (tileID == ((rowCount * columnCount) - 1)) {
        tiles.push(tileID - columnCount);
        tiles.push(tileID - columnCount - 1);
        tiles.push(tileID - 1);

        return tiles
    }
    // bottom left corner
    if (tileID == ((rowCount * columnCount) - columnCount - 1)) {
        tiles.push(tileID - columnCount);
        tiles.push(tileID - columnCount + 1);
        tiles.push(tileID + 1);

        return tiles
    }
    // left column
    if (tileID % columnCount === 0) {
        tiles.push(tileID - columnCount);
        tiles.push(tileID - columnCount + 1);
        tiles.push(tileID + 1);
        tiles.push(tileID + columnCount);
        tiles.push(tileID + columnCount + 1);

        return tiles
    }
    // right column
    if (tileID % (columnCount - 1) === 0) {
        tiles.push(tileID - columnCount - 1);
        tiles.push(tileID - columnCount);
        tiles.push(tileID - 1);
        tiles.push(tileID + columnCount - 1);
        tiles.push(tileID + columnCount);

        return tiles
    }
    // first row
    if (tileID < columnCount) {
        tiles.push(tileID - 1);
        tiles.push(tileID + 1);
        tiles.push(tileID + columnCount - 1);
        tiles.push(tileID + columnCount);
        tiles.push(tileID + columnCount + 1);

        return tiles
    }
    // last row
    if (tileID > ((columnCount * rowCount) - columnCount)) {
        tiles.push(tileID - columnCount - 1);
        tiles.push(tileID - columnCount);
        tiles.push(tileID - columnCount + 1);
        tiles.push(tileID - 1);
        tiles.push(tileID + 1);

        return tiles
    }

    tiles.push(tileID - columnCount - 1);
    tiles.push(tileID - columnCount);
    tiles.push(tileID - columnCount + 1);
    tiles.push(tileID - 1);
    tiles.push(tileID + 1);
    tiles.push(tileID + columnCount - 1);
    tiles.push(tileID + columnCount);
    tiles.push(tileID + columnCount + 1);

    return tiles
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
    if (flag) { return }

    const id = event.currentTarget.id
    const hasMine = event.currentTarget.hasMine
    const mineCounter = event.currentTarget.MineCounter

    let tile = document.getElementById(id)

    event.currentTarget.revealed = true

    if (hasMine) {
        tile.style.backgroundColor = "red"
        // location.reload()
    }
    else {
        tile.style.backgroundColor = "darkgrey"
    }

    if (mineCounter) {
        addTileNumberCSS(id, mineCounter)
    }
}

/**
 * Adds the number on the tile and the CSS
 */
function addTileNumberCSS(tileID, mineCounter) {
        const tile = document.getElementById(tileID);

        if (mineCounter !== 0 && !tile.hasMine) {
            let text = document.createElement("p");
            text.innerHTML = mineCounter;
            tile.appendChild(text);
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