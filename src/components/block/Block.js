import React, { Component } from 'react';
import Cell from '../cell/Cell'
import './Block.css';

class Block extends Component {
    renderCell (row, col) {
        var { actions, grid, suggestion } = this.props;
        return(
            <Cell row={row} col={col} actions={actions} grid={grid} suggestion={suggestion} key={row + '-' + col}></Cell>   
        );
    }

    render() {
        var cells = [];
        for(var r = this.props.row * 3; r < this.props.row * 3 + 3; r++){
            for(var c = this.props.col * 3; c < this.props.col * 3 + 3; c++){
                cells.push(this.renderCell(r,c));
            }
        }

        return (
            <div className="Block">
                {cells}
            </div>
        );
    }
}

export default Block;
