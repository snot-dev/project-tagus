import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';
import store from '../../../../../../../../services/store';
import {addField} from '../../../../../../../../services/units/actions';

class AddFieldMenu extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                name: "Name",
                alias: "name",
                type: "text",
                required: true
            },
            {
                name: "Type",
                alias: "type",
                type: "text",
                required: true
            },
            {
                name: "Required",
                alias: "required",
                type: "checkbox"
            }
        ]
    }
    
    _onClose() {
        if(this.props.show) {
            store.dispatch(addField(false));
        }
    }



    _renderMenu() {
        return(
            <Menu title= {`Add a new Field to ${this.props.tab}`} className="col-xs-6" onCloseButton={this._onClose.bind(this)} >
                <Form name="field" fields={this.fields} onSubmit={this.props.onSubmit}/>
            </Menu>
        );
    }

    render() {
        const menu = this.props.show ? this._renderMenu() : null;
        
        return menu;
    }
}

export default AddFieldMenu;