import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './topBar.css';

class TopBar extends Component {
    render() {
        return (
            <nav id="tagus-top-bar">
                <div id="tagus-nav-header-container">
                    <Link to="/home" id="tagus-nav-logo">
                        <img src="/logo/Tagus_Logo_Horizontal_White_Smaller.png" title="tagus" alt="tagus" />
                    </Link>
                </div>
                <div className="tagus-top-bar-container">
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