import React, { Component } from 'react';
import './addLink.css';

class AddLink extends Component {
    _onClick() {
        if(!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    }

    _render() {
        const className = this.props.className || '';
        const disabled = this.props.disabled ? 'disabled' : '';
        return (
            <div className="row" >
                <div className={`col-xs-12 ${disabled} ${className}`} >
                    <a className="tagus-unit-add-link" onClick={this._onClick.bind(this)}><i className="fa fa-plus-square" aria-hidden="true"></i>{this.props.text}</a>
                </div>
            </div>
        ); 
    }

    render() {
        const render = this.props.show || typeof this.props.show === 'undefined' ? this._render() : null;

        return render;
    }
}

export default AddLink;
