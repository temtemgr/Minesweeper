/**
 * Gets html element by their id
 * @param {String} id 
 * @returns {Object} 
 */
function getId(id) { return document.getElementById(id) }

const rowCount = 15
const columnCount = 15
const boxSize = 25
let gamemode = "easy";

const minefield = getId("minefield");

minefield.style.setProperty("--rowCount", rowCount)
minefield.style.setProperty("--columnCount", columnCount)
minefield.style.setProperty("--boxSize", boxSize + "px")

window.onload = function () {
    setGrid();
};

/**
 * Generates the minefield grid by creating divs in the minefiled div and giving them ids
 */
function setGrid() {
    for (let i = 0; i < rowCount*columnCount; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("minefield").appendChild(tile);
    }
}

function changeMode() {

}