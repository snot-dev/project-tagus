import React, { Component } from 'react';
import Avatar from './components/Avatar';
import Navigation from './components/Navigation';
import NavItem from './components/NavItem';
import './appBar.css';

class AppBar extends Component {
    render() {
        return (
            <nav id="app-side-menu">
                <div className="nav-container">
                    <Avatar />
                    <Navigation title="Menu">
                        <NavItem href="#" icon="file">Content</NavItem>
                        <NavItem href="#" icon="ship">Units</NavItem>
                        <NavItem href="#" icon="anchor">Unit Fields</NavItem>
                        <NavItem href="#" icon="cogs">Settings</NavItem>
                    </Navigation>
                </div>
            </nav>
        );
    }
}

export default AppBar;