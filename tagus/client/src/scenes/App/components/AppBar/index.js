import React, { Component } from 'react';
import Avatar from './components/Avatar';
import Navigation from './components/Navigation';
import './appBar.css';

class AppBar extends Component {
    render() {
        return (
            <nav id="app-side-menu">
                <div className="nav-container">
                    <Avatar />
                    <Navigation />
                </div>
            </nav>
        );
    }
}

export default AppBar;