import React, { Component } from 'react';
import Avatar from './components/Avatar';
import Navigation from './components/Navigation';
import './appBar.css';

class AppBar extends Component {
    render() {
        return (
            <nav id="app-side-menu" className="navbar">
                <div className="nav-container collapse navbar-collapse">
                    <Avatar />
                    <Navigation />
                </div>
            </nav>
        );
    }
}

export default AppBar;