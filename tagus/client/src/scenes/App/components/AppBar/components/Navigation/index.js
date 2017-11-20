import React, { Component } from 'react';
import './navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div id="navigation">
                <p id="navigation-header">{this.props.title}</p>
                <ul id="side-navigation">
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

export default Navigation;