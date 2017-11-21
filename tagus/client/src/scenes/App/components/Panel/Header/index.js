import React, { Component } from 'react';
import './header.css'

class Header extends Component {
    render() {
        return (
            <div className="tagus-panel-header">
                <h3>
                   {this.props.children}
                </h3>
            </div>
        );
    }
}

export default Header;