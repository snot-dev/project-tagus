import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import './navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div id="navigation">
                <p id="navigation-header">MENU</p>
                <ul id="side-navigation">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">About</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navigation;