import React, { Component } from 'react';
import './menu.css';

class Menu extends Component {
    render() {
        const className = this.props.className || '';

        return (
            <div className={`tagus-menu ${className}`}>
                {this.props.title
                ? <div className="row">
                    <div className="col-xs-12 tagus-menu-header">{this.props.title}</div>
                  </div>
                : null}
                
                <div className="row">
                    <div className="col-xs-12 tagus-menu-content">
                        {this.props.children}   
                    </div>
                </div>
                {this.props.onCloseButton 
                ? <div className="tagus-menu-close-button" onClick={this.props.onCloseButton}>X</div>
                : null}
            </div>
        );
    }
}

export default Menu;