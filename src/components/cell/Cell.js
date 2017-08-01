import React, { Component } from 'react';
import Direction from '../../models/Direction';
import './Cell.css';

class Cell extends Component {

    constructor(props){
        super();
        this.handleKey = this.handleKey.bind(this);
    }

    getId() {
        return 'cell,' + this.props.row + ',' + this.props.col;   
    }

    getCellStyle (cell) {
        var style = {};
        if (this.props.suggestion && this.props.suggestion.row === this.props.row && this.props.suggestion.col === this.props.col){
            style.backgroundColor = '#C5E1A5'; 
        }
        if (!cell.editable){
            style.fontWeight = '700';
        }
        return style;
    }

    handleKey (e) {
        // numbers
        if(e.key >= 1 && e.key <= 9){
            this.props.actions.setCellValue(this.props.row, this.props.col, parseInt(e.key, 10));
            return;
        }

        // delete
        if(e.key === 'Delete' || e.key === 'Backspace'){
            this.props.actions.clearCell(this.props.row, this.props.col);
            return;
        }

        // direction
        var direction = Direction.extractDirection(e.key);
        if(direction){
            this.handleArrow(direction, this.props.row, this.props.col, e);
            return;
        }
    }
    
    handleArrow (direction, currentRow, currentCol, event){
        var newRow = currentRow + direction.rowOffset;
        var newCol = currentCol + direction.colOffset;
        if (newRow < 0 || newRow >= 9 || newCol < 0 || newCol >= 9){
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        var newCellId = 'cell,' + newRow + ',' + newCol;
        var newCell = document.getElementById(newCellId);
        if(newCell){
            newCell.focus();
        }
    }

    getClassName (){
        if (this.props.suggestion && this.props.suggestion.row === this.props.row && this.props.suggestion.col === this.props.col){
            return "Cell Hint"; 
        }
        else {
            return "Cell";
        }
    }

    getSuggestion (){
        if(this.props.suggestion){
            return this.props.suggestion.value;
        }
        else {
            return null;
        }
    }

    render() {
        var cell = this.props.grid[this.props.row][this.props.col];
        return (
            <div className={this.getClassName()} id={this.getId()} tabIndex="0" onKeyDown={this.handleKey} style={this.getCellStyle(cell)}>
                {cell.value}
                <div className="Suggestion">{this.getSuggestion()}</div>
            </div>
        );
    }
}

export default Cell;

