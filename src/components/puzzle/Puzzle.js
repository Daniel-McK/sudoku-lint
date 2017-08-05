import React, { Component } from 'react';
import Block from '../block/Block';
import './Puzzle.css';

class Puzzle extends Component {
    renderBlock (row, col) {
        var { actions, grid, suggestion } = this.props;
        return(
            <Block row={row} col={col} actions={actions} grid={grid} suggestion={suggestion} key={row + '-' + col}></Block>   
        );
    }

    render() {
        var blocks = []
        for(var r = 0; r < 3; r++){
            for(var c = 0; c < 3; c++){
                blocks.push(this.renderBlock(r,c));
            }
        }

        return (
            <div className="Puzzle">
                <div className="Puzzle-content">
                    {blocks}
                </div>
            </div>
        );
    }
}

export default Puzzle;
