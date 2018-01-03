import React, { Component } from 'react';
import './navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div className="tagus-navigation">
                <p className="tagus-navigation-header">{this.props.title}</p>
                <ul className="tagus-menu-list">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default Navigation;