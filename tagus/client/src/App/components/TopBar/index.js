import React, { Component } from 'react';
import './topBar.css';

class TopBar extends Component {
    render() {
        return (
            <nav id="top-bar">
                <div id="navHeaderContainer">
                    <h1 id="navHeader">tagus</h1>
                </div>
                <div className="top-bar-container">
                    <div className="pull-right tagus-top-buttons-container">
                        <a onClick={this.props.onLogoffClick} className="tagus-logoff-button"><i className="fa fa-power-off"></i></a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default TopBar;