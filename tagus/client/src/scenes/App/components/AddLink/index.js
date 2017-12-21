import React, { Component } from 'react';
import './addLink.css';

class AddLink extends Component {
    _addTabClick() {
        if(!this.props.addingTab) {
            // store.dispatch(addTab());
        }
     }

    _render() {
        const className = this.props.className || '';
        return (
            <div className="row" >
                <div className={`col-xs-12 ${className}`} >
                    <a className="tagus-unit-add-link" onClick={this.props.onClick}><i className="fa fa-plus-square" aria-hidden="true"></i>{this.props.text}</a>
                </div>
            </div>
        ); 
    }

    render() {
        const render = this.props.show ? this._render() : null;

        return render;
    }
}

export default AddLink;
