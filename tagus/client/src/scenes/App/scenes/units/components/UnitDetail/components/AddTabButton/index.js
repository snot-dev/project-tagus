import React, { Component } from 'react';
import store from '../../../../../../../../services/store';
import {addTab} from '../../../../../../../../services/units/actions';

class AddTabButton extends Component {
    _addTabClick() {
        if(!this.props.addingTab) {
            store.dispatch(addTab());
        }
     }

    _render() {
        return (
            <div className="row" >
                <div className="col-xs-12">
                    <a className="tagus-unit-add-link" onClick={this._addTabClick.bind(this)}><i className="fa fa-plus-square" aria-hidden="true"></i>Add new tab</a>
                </div>
            </div>
        ); 
    }

    render() {
        const render = this.props.show ? this._render() : null;

        return render;
    }
}

export default AddTabButton;
