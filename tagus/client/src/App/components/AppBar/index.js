import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './components/Navigation';
import NavItem from './components/NavItem';
import './appBar.css';

class AppBar extends Component {
    _shouldRender(route) {
        const isPrivate = !route.private || (route.private && this.props.user.isAdmin);

        return route.nav && isPrivate;
    }

    render() {
        return (
            <nav id="tagus-side-menu">
                <div className="nav-container">
                    <Navigation title="Menu">
                        {this.props.routes.map((route, index) => {
                            if (!this._shouldRender(route)) {
                                return null;   
                            }

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
    routes: PropTypes.array,
    user: PropTypes.object
};

export default AppBar;