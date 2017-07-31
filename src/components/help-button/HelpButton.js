import React, { Component } from 'react';
import './HelpButton.css';

class HelpButton extends Component {

    constructor(props){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        this.props.actions.showHint();
    }

    render() {
        return (
            <button onClick={this.handleSubmit}>Get a hint</button>
        );
    }
}

export default HelpButton;

