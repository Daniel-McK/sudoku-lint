import * as types from '../actions/types';

export default function gridSuggestion (state, action){
    var newGrid, cell;
    switch (action.type){
        case types.SET_CELL_VALUE:
            if(!isValidDim(action.row) || !isValidDim(action.col)){
                return state.grid;
            }
            newGrid = duplicate2dArray(state.grid);
            cell = newGrid[action.row][action.col];
            if(cell.editable){
                cell.value = action.value;
            }
            return newGrid;
        case types.CLEAR_CELL:
            if(!isValidDim(action.row) || !isValidDim(action.col)){
                return state;
            }
            newGrid = duplicate2dArray(state.grid);
            cell = newGrid[action.row][action.col];
            if(cell.editable){
                cell.value = null;
            }
            return newGrid;
        default:
            return state.grid;
    }
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