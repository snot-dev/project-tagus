import React, { Component } from 'react';
import './navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div className="tagus-navigation">
                <p className="tagus-navigation-header">{this.props.title}</p>
                <ul className="tagus-side-navigation">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default Navigation;