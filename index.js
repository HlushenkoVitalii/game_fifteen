'use strict'

let forCheck = '123456789101112131415clear';

let numbers = [1,2,3,4,5,6,7,8,9,10,'clear',11,12,13,14,15];

let container = document.getElementById('game');



container.addEventListener('select', checkTile);


function viewGame(numbers) {
    let tilesView = '';
    let allTiles = '';
    let numberTile = 0;

    for (let i = 0; i < numbers.length; i++) {
        let tile = numbers[i];
        let number = i + 1;
        numberTile++;
        tilesView += collectTile(tile, number, numberTile);
        if (!(number % 4)) {
            allTiles += collectRow(tilesView);
            tilesView = '';
            numberTile = 0;
        }
    }
    container.innerHTML = allTiles;


    function collectTile(tile, number, numberTile) {
        if (tile === 'clear') {
            return `<div class="tile clear" data-number="${numberTile}" data-index="${number}"></div>`;
        }
        return `<div class="tile" data-number="${numberTile}" data-index="${number}">${tile}</div>`;

    }
    
    function collectRow(tilesView) {
        return `<div class="row">${tilesView}</div>`
    }

}

viewGame(numbers);



function checkTile(event) {
    let clearTile = document.querySelector('.tile.clear');
    let selectTile = event.target;
    if (clearTile.previousSibling === selectTile || clearTile.nextSibling === selectTile) {
        moveTile(selectTile);
    }
    else {
        let clearTileRow = clearTile.parentElement;
        let selectTileRow = selectTile.parentElement;

        if (clearTileRow.previousSibling === selectTileRow || clearTileRow.nextSibling === selectTileRow ) {
            let numberTileClear = clearTile.getAttribute('data-number');
            let numberTileClick = selectTile.getAttribute('data-number');
            if (numberTileClear === numberTileClick) {
                moveTile(selectTile);
            }
        }
    }
}

// function moveTile() {
//
// }
// checkTile();
