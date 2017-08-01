import * as types from '../actions/types'

export default function suggestionReducer (state, action) {
    switch (action.type){
        case types.SHOW_HINT:
            return findSuggestion(state.grid);
        default:
            return null;
    }
}

function findSuggestion (grid){
    var suggestion = checkRows(grid);
    return suggestion;
}

function checkRows (grid){
    for (var r = 0; r < 9; r++){
        let suggestion = checkRow(grid, r);
        if (suggestion){
            return suggestion;
        }
    }
    return null;
}

function checkRow (grid, rowIndex){
    var row = grid[rowIndex];
    var options = [1,2,3,4,5,6,7,8,9];
    var lastEmptyCell = -1;
    for (var c = 0; c < 9; c++){
        let cell = row[c];
        if(cell.value){
            let optionIndex = options.indexOf(cell.value);
            if (optionIndex === -1){
                return null;
            }
            options.splice(optionIndex, 1);
        }
        else {
            if(lastEmptyCell !== -1){
                return null;
            }
            lastEmptyCell = c;
        }
    }
    return lastEmptyCell === -1 || options.length !== 1
        ? null
        : {
            row: rowIndex,
            col: lastEmptyCell,
            value: options[0]
        };
}