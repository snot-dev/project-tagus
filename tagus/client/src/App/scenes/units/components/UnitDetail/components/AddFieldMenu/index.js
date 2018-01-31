import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';

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

    _renderMenu() {
        const title = this.props.defaultValues ? `Edit ${this.props.defaultValues.name}` : `Add a new Field to ${this.props.tab}`;
        return(
            <Menu title= {title} className="col-xs-6" onCloseButton={this._onClose.bind(this)} >
                <Form name="field" fields={this.fields} defaultValues={this.props.defaultValues} onSubmit={this.props.onSubmit}>
                    {this.state.type === 'dropdownList' ? "Options will appear here" : null }
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