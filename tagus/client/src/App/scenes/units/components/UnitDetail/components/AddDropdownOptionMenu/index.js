import React, { Component } from 'react';
import Form from '../../../../../../components/Form';
import Menu from '../../../../../../components/Menu';

class AddDropdownOptionMenu extends Component {
    componentWillMount() {
        this.fields = [
            {
                "name": "Label",
                "alias": "label",
                "type": "text",
                "required": true
            },
            {
                "name": "Value",
                "alias": "value",
                "type": "text",
                "required": true
            }
        ]
    }
    
    _render() {
        return(
            <Menu title="Add Option" className="col-xs-6" onCloseButton={this.props.onClose} >
                <Form name='dropdownOption' fields={this.fields} onSubmit={this.props.onSubmit} />
            </Menu>
        );
    }

    render() {
        return this.props.show ? this._render() : null;
    }
}

export default AddDropdownOptionMenu;