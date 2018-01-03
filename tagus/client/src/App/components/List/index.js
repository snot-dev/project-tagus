import React, { Component } from 'react';
import './list.css';

class List extends Component {
    render() {
        const className = this.props.className || '';
        return (
            <ul id={this.props.id} className={`tagus-list ${className}`}>
                {this.props.children}
            </ul>
        );
    }
}

export default List;