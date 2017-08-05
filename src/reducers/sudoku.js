import easyBoard from '../assets/easyboard'
import suggestionReducer from './suggestion';
import gridReducer from './grid';

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
    return {
        suggestion: suggestionReducer(state, action),
        grid: gridReducer(state, action)
    }

}