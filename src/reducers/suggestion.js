import * as types from '../actions/types'

const baseOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function suggestionReducer (state, action) {
    switch (action.type){
        case types.SHOW_HINT:
            return findSuggestion(state.grid);
        default:
            return null;
    }
}

function findSuggestion (grid){
    var suggestion = checkAllCells(grid);
    return suggestion;
}

function checkAllCells (grid) {

    var optionsGrid = baseOptions.map(row => {
        return baseOptions.map(col => {
            return { 
                options: baseOptions.slice(), 
                set: false
            };
        });
    });

    for (var r = 0; r < 9; r++){
        for (var c = 0; c < 9; c++){
            var cell = grid[r][c];
            if (cell.value !== null){
                let suggestion = removeOptions(grid, optionsGrid, cell.value);
                if (suggestion){
                    return suggestion;
                }
            }
        }
    }
    return null;
}

function removeOptions (grid, optionsGrid, option) {
    for (var r = 0; r < 9; r++){
        var suggestion = removeOptionFromRow(grid, optionsGrid, r, option);
        if (suggestion){
            return suggestion;
        }
    }
    return null;
}

function removeOptionFromRow (grid, optionsGrid, row, value){
    for (var col = 0; col < 9; col++){
        var cell = grid[row][col];
        if (cell.value === null){
            let option = removeOptionFromCell(optionsGrid[row][col], value);
            if(option >= 1){
                return { row, col, value: option };
            }
        }
    }
    return null;
}

function removeOptionFromCell (cell, option){
    var optionIndex = cell.options.indexOf(option);
    if (optionIndex !== -1){
        cell.options.splice(optionIndex, 1);
        if (cell.options.length == 1){
            return cell.options[0];
        }
    }
    return -1;
}