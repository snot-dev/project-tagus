import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import {Link} from 'react-router-dom';
import './contentMenu.css';

class ContentMenu extends Component {
    render() {
        return (
            <Menu onCloseButton={this.props.onCloseButton} title="Menu" className="col-xs-6 content-menu">
                <ul className="tagus-menu-list row">
                    <li className="tagus-menu-item"><Link to="/content/create" className="tagus-menu-link">Add child to {this.props.detail.name}</Link></li>
                    <li className="tagus-menu-item"><a className="tagus-menu-link">Delete</a></li>
                </ul>
            </Menu>
        );
    }
}

export default ContentMenu;