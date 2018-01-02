import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';
import store from '../../../../../../../../services/store';
import {addField} from '../../../../../../../../services/units/actions';

class AddFieldMenu extends Component {
    componentWillMount() {
        const fields = this._convertToLabelValue(this.props.unitFields);

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
                type: "select",
                options: fields,
                required: true
            },
            {
                name: "Required",
                alias: "required",
                type: "checkbox"
            }
        ];
    }

    shouldComponentUpdate(nextProps) {
        const fields = this.props.unitFields.length !== nextProps.unitFields.length;
        const show = this.props.show !== nextProps.show;

        return show || fields;
    }

    componentWillUpdate(nextProps) {
        const fields = this._convertToLabelValue(nextProps.unitFields);
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
                type: "select",
                options: fields,
                required: true
            },
            {
                name: "Required",
                alias: "required",
                type: "checkbox"
            }
        ];
    }

    _convertToLabelValue(fields) {
        const arr = [];

        for(const field of fields) {
            arr.push({label: field.name, value: field.alias});
        }

        return arr;
    }

    _onClose() {
        if(this.props.show && this.props.onClose) {
            this.props.onClose()
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