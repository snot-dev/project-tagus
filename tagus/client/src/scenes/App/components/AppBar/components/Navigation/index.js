import React, { Component } from 'react';
import './navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div id="navigation">
                <p id="navigation-header">MENU</p>
                <ul id="side-navigation">
                    <li className="nav-item">
                        <a className="nav-link active" href="#"><i className="fa fa-file" aria-hidden="true"></i>Content</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fa fa-ship" aria-hidden="true"></i>Units</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fa fa-anchor" aria-hidden="true"></i>Unit Fields</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fa fa-cogs" aria-hidden="true"></i>Settings</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navigation;