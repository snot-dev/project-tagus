import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';
import DropdownOptionsList from '../DropdownOptionsList';

class AddFieldMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null
        };
    }

    componentWillReceiveProps(props) {
        if(props.defaultValues) {
            this.setState({
                type: props.defaultValues.type
            });
        }
    }

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

    shouldComponentUpdate(nextProps, nextState) {
        const fields = this.props.unitFields.length !== nextProps.unitFields.length;
        const show = this.props.show !== nextProps.show;
        const type = this.state.type !== nextState.type;

        return show || fields || type;
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
                required: true,
                onChange: this._onTypeChange.bind(this)
            },
            {
                name: "Required",
                alias: "required",
                type: "checkbox"
            }
        ];
    }
    
    _onTypeChange(value) {
        if(value !== this.state.type) {
            this.setState({type: value});
            console.warn(this.state);
        }
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

    _generateOptions() {
        return [
            {label: "option 1", value: "1"},
            {label: "option 2", value: "2"},
            {label: "option 3", value: "3"},
            {label: "option 4", value: "4"},
            {label: "option 5", value: "5"}
        ];
    }

    _renderMenu() {
        const title = this.props.defaultValues ? `Edit ${this.props.defaultValues.name}` : `Add a new Field to ${this.props.tab}`;
        return(
            <Menu title= {title} className="col-xs-6" onCloseButton={this._onClose.bind(this)} >
                <Form name="field" fields={this.fields} defaultValues={this.props.defaultValues} onSubmit={this.props.onSubmit}>
                    {this.state.type === 'dropdownList' ? <DropdownOptionsList options={this._generateOptions()}/> : null }
                </Form>
            </Menu>
        );
    }

    render() {
        const menu = this.props.show ? this._renderMenu() : null;
        
        return menu;
    }
}

export default AddFieldMenu;