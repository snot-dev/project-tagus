import React, { Component } from 'react';
import Avatar from './components/Avatar';
import Navigation from './components/Navigation';
import NavItem from './components/NavItem';
import './appBar.css';

//TODO: Change list to props
class AppBar extends Component {
    render() {
        return (
            <nav id="tagus-side-menu">
                <div className="nav-container">
                    <Avatar />
                    <Navigation title="Menu">
                        <NavItem to="/content" icon="file">Content</NavItem>
                        <NavItem to="/units" icon="ship">Units</NavItem>
                        <NavItem to="/bridges" icon="life-ring">Bridges</NavItem>
                        {/*<NavItem to="/content" icon="anchor">Unit Fields</NavItem>
                        <NavItem to="/content" icon="cogs">Settings</NavItem> */}
                    </Navigation>
                </div>
            </nav>
        );
    }
}

export default AppBar;