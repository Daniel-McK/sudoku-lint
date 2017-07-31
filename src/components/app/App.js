import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import logo from '../../assets/logo.svg';
import Puzzle from '../puzzle/Puzzle';
import HelpButton from '../help-button/HelpButton';
import * as SudokuActions from '../../actions/sudoku'
import './App.css';

class App extends Component {

  constructor(props){
    super();
  }

  render() {
    const { grid, actions, suggestion } = this.props

    return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>sudoku-lint</h2>
          </div>
          <div className="App-content">
            <Puzzle grid={grid} actions={actions} suggestion={suggestion}></Puzzle>
            <HelpButton actions={actions}></HelpButton>
          </div>
        </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    grid: state.grid,
    suggestion: state.suggestion
  };
}

function mapDispatchToProps (dispatch){
  return {
    actions: bindActionCreators(SudokuActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
