'use strict'

let forCheck = '123456789101112131415clear';

let numbers = [1,2,3,4,5,6,7,8,9,10,'clear',11,12,13,14,15];

let container = document.getElementById('game');



container.addEventListener('click', checkTile);


function viewGame(numbers) {
    let tilesView = '';
    let allTiles = '';
    for (let i = 0; i < numbers.length; i++) {
        let tile = numbers[i];
        let number = i + 1;
        tilesView += collectTile(tile, number);
        if (!(number % 4)) {
            allTiles += collectRow(tilesView);
            tilesView = '';
        }
    }
    container.innerHTML = allTiles;


    function collectTile(tile, number) {
        if (tile === 'clear') {
            return `<div class="tile clear" data-index="${number}"></div>`;
        }
        return `<div class="tile" data-index="${number}">${tile}</div>`;

    }
    
    function collectRow(tilesView) {
        return `<div class="row">${tilesView}</div>`
    }

}

viewGame(numbers);



// function checkTile() {
//     let clearTile = document.querySelector('.tile.clear').parentElement;
//     console.log(clearTile.nodeType);
//
// };
//
// checkTile();
