import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.string
};

export default NavItem;