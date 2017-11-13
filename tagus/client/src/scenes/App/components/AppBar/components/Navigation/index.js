import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import './style.css';

class Navigation extends Component {
    render() {
        return (
            <Nav stacked>
            <NavItem eventKey={1} href="/">NavItem 1 content</NavItem>
            <NavItem eventKey={1} href="/">NavItem 2 content</NavItem>
            <NavItem eventKey={1} href="/">NavItem 3 content</NavItem>
            </Nav>
        );
    }
}

export default Navigation;