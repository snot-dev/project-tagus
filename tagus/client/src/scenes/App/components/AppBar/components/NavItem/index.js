import React, { Component } from 'react';
import './navItem.css';

class NavItem extends Component {
    render() {
        return (
            <li className="tagus-nav-item">
                <a className="tagus-nav-link" href={this.props.href}><i className={"fa fa-"+ this.props.icon} aria-hidden="true"></i>{this.props.children}</a>
            </li>
        );
    }
}

export default NavItem;