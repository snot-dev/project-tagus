import React, { Component } from 'react';
import './listItem.css';

class ListItem extends Component {
    render() {
        const className = this.props.className || '';
        return (
            <li id={this.props.id} className={`tagus-list-item ${className}`}>
                {this.props.children}
            </li>
        );
    }
}

export default ListItem;