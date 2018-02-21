import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './topBar.css';

class TopBar extends Component {
    //TODO: add logo
    render() {
        return (
            <nav id="top-bar">
                <div id="navHeaderContainer">
                    <h1 id="navHeader">tagus</h1>
                </div>
                <div className="top-bar-container">
                    <div className="pull-right tagus-top-buttons-container">
                         <a className="tagus-top-avatar tagus-top-button"><i className="fa fa-user"></i><span className="tagus-top-user-username">{this.props.user.username}</span></a>
                         <a onClick={this.props.onLogoffClick} className="tagus-logoff-button tagus-top-button" title="log off"><i className="fa fa-power-off"></i></a>
                    </div>
                </div>
            </nav>
        );
    }
}

TopBar.propTypes = {
    user: PropTypes.object.isRequired,
    onLogoffClick: PropTypes.func.isRequired
};

export default TopBar;