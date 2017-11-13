import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import Avatar from './components/Avatar';
import './style.css';

class AppBar extends Component {
    render() {
        return (
            <div id="app-side-menu">
                <Avatar />
                <Nav stacked>
                <NavItem eventKey={1} href="/">NavItem 1 content</NavItem>
                <NavItem eventKey={1} href="/">NavItem 2 content</NavItem>
                <NavItem eventKey={1} href="/">NavItem 3 content</NavItem>
                </Nav>
            </div>
        );
    }
}

export default AppBar;