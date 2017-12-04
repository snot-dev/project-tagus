import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './navItem.css';

class NavItem extends Component {
    render() {
        return (
            <li className="tagus-menu-item">
                <NavLink className="tagus-menu-link" to={this.props.to}><i className={"fa fa-"+ this.props.icon} aria-hidden="true"></i>{this.props.children}</NavLink>
            </li>
        );
    }
}

export default NavItem;