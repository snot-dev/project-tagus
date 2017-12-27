import React, { Component } from 'react';
import './header.css'

class Header extends Component {
    render() {
        return (
            <div className="row header-container">
                <div className="tagus-panel-header">
                    <h3>
                        {this.props.children}
                    </h3>
                </div>
            </div>
        );
    }
}

export default Header;