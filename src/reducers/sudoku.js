import * as types from '../actions/types'
import easyBoard from '../assets/easyboard'


var initialState = {};
initialState.grid = easyBoard.map(row => {
    return row.map(cell => {
        return cell !== 0 
            ? { editable: false, value: cell}
            : { editable: true, value: null};
    });
});
initialState.suggestion = null;

for(var r = 0; r < 9; r++){
    let row = [];
    for(var c = 0; c < 9; c++){
        row.push({editable: true, value: null});
    }
    initialState.grid.push(row);
}

export default function sudoku (state = initialState, action){
    var newState, cell;
    switch (action.type){
        case types.SET_CELL_VALUE:
            if(!isValidDim(action.row) || !isValidDim(action.col)){
                return state;
            }
            newState = duplicateState(state);
            cell = newState.grid[action.row][action.col];
            if(cell.editable){
                cell.value = action.value;
            }
            return newState;
        case types.CLEAR_CELL:
            if(!isValidDim(action.row) || !isValidDim(action.col)){
                return state;
            }
            newState = duplicateState(state);
            cell = newState.grid[action.row][action.col];
            if(cell.editable){
                cell.value = null;
            }
            return newState;
        case types.SHOW_HINT:
            newState = duplicateState(state);
            newState.suggestion = findSuggestion(state.grid);
            return newState;
        default:
            return state;
    }
}

// helpers

function duplicateState (previous){
    return {
        grid: duplicate2dArray(previous.grid),
        suggestion: null
    };
}

function duplicate2dArray (arr){
    return arr.map(row => {
        return row.map(cell => {
            return {...cell};
        });
    })
}

function isValidDim (val){
    return val >= 0 && val < 9;
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
            options.splice(options.indexOf(cell.value), 1);
        }
        else {
            if(lastEmptyCell !== -1){
                return null;
            }
            lastEmptyCell = c;
        }
    }
    return lastEmptyCell === -1 
        ? null
        : {
            row: rowIndex,
            col: lastEmptyCell,
            value: options[0]
        };
}