import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './components/Navigation';
import NavItem from './components/NavItem';
import './appBar.css';

class AppBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            window: {
                width: 0,
                height: 0
            }
        };

        this._updateWindowDimensions = this._updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this._updateWindowDimensions();
        window.addEventListener('resize', this._updateWindowDimensions);
    }
      
    componentWillUnmount() {
    window.removeEventListener('resize', this._updateWindowDimensions);
    }
    
    _updateWindowDimensions() {
    this.setState({ window: {width: window.innerWidth, height: window.innerHeight }});
      }

    _shouldRender(route) {
        const isPrivate = !route.private || (route.private && this.props.user.isAdmin);

        return route.nav && isPrivate;
    }

    render() {
        console.warn(this.state);
        return (
            <nav id="tagus-side-menu-container">
                <div id="tagus-side-menu">
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