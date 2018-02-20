import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Avatar from './components/Avatar';
import Navigation from './components/Navigation';
import NavItem from './components/NavItem';
import './appBar.css';

class AppBar extends Component {
    render() {
        return (
            <nav id="tagus-side-menu">
                <div className="nav-container">
                    <Navigation title="Menu">
                        {this.props.routes.map((route, index) => {
                            return (
                                <NavItem key={`${index}_${route.name}`} to={route.path} icon={route.icon}>{route.name}</NavItem>
                            );
                        })}
                    </Navigation>
                </div>
            </nav>
        );
    }
}

AppBar.prototypes = {
    routes: PropTypes.array
};

export default AppBar;