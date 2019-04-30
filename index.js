'use strict'

let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'clear'];

let container = document.getElementById('game');
let startButton = document.querySelector('button');
let checkButton = document.querySelector('.checkButton');
let congratulations = document.querySelector('.endGame');


container.addEventListener('click', checkTile);
startButton.addEventListener('click', shuffleArray);
checkButton.addEventListener('click', checkGame);

function viewGame(numbers) {
    let tilesView = '';
    let allTiles = '';
    let numberTile = -1;

    for (let i = 0; i < numbers.length; i++) {
        let tile = numbers[i];
        let number = i + 1;
        numberTile++;
        tilesView += collectTile(tile, number, numberTile);
        if (!(number % 4)) {
            allTiles += collectRow(tilesView);
            tilesView = '';
            numberTile = -1;
        }
    }
    container.innerHTML = allTiles;


    function collectTile(tile, number, numberTile) {
        if (tile === 'clear') {
            return `<div class="tile clear" data-number="${numberTile}">clear</div>`;
        }
        return `<div class="tile" data-number="${numberTile}">${tile}</div>`;

    }
    
    function collectRow(tilesView) {
        return `<div class="row">${tilesView}</div>`
    }

}


function shuffleArray() {
    congratulations.style.opacity = '0';
    for (let i = numbers.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = numbers[i];
        numbers[i] = numbers[j];
        numbers[j] = temp;
    }

    viewGame(numbers);
}


viewGame(numbers);




function checkTile(event) {
    let clearTile = document.querySelector('.tile.clear');
    let selectTile = event.target;

    let clearTileRow = clearTile.parentElement;
    let selectTileRow = selectTile.parentElement;

    let numberTileClear = clearTile.getAttribute('data-number');
    let numberTileSelect = selectTile.getAttribute('data-number');

    if (clearTile.previousSibling === selectTile || clearTile.nextSibling === selectTile) {
        moveTile(clearTile, clearTileRow, selectTile, selectTileRow, numberTileClear, numberTileSelect);
    }
    else {
        if (clearTileRow.previousSibling === selectTileRow || clearTileRow.nextSibling === selectTileRow ) {
            if (numberTileClear === numberTileSelect) {
                moveTile(clearTile, clearTileRow, selectTile, selectTileRow, numberTileClear, numberTileSelect);
            }
        }
    }
}

function moveTile(clearTile, clearTileRow, selectTile, selectTileRow, numberTileClear, numberTileSelect) {
    let cloneClearTile = clearTile.cloneNode(true);
    let cloneSelectTile = selectTile.cloneNode(true);
    cloneClearTile.dataset.number = numberTileSelect;
    cloneSelectTile.dataset.number = numberTileClear;

    clearTileRow.replaceChild(cloneSelectTile, clearTile);
    selectTileRow.replaceChild(cloneClearTile, selectTile);
    endGame();
}

function endGame() {
    let forCheck = '123456789101112131415clear';
    let allTiles = document.getElementsByClassName('tile');
    let allNumbers = '';
    for (let i = 0; i < allTiles.length; i++) {
        let number = allTiles[i].innerHTML;
        allNumbers += number;
    }
    if (forCheck === allNumbers) {
        congratulations.style.opacity = '1';
    }

}

function checkGame() {
    numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,'clear',15];
    viewGame(numbers);
}






