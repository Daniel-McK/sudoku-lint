import { SET_CELL_VALUE, CLEAR_CELL, SHOW_HINT } from './types'

export function setCellValue (row, col, value){
    return {
        type: SET_CELL_VALUE,
        row,
        col,
        value
    };
}
export function clearCell (row, col){
    return {
        type: CLEAR_CELL,
        row,
        col
    };
}
export function showHint() {
    return {
        type: SHOW_HINT
    };
}