import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';
import './createBridgeMenu.css';

class CreateBridgeMenu extends Component {
    componentWillUpdate() {
        const units = this.props.units ? this._convertToOptions(this.props.units) : null;

        this.fields = [
            {
                name: "Name",
                alias: "name",
                type: "text",
                required: true
            },
            {
                name: "Unit",
                alias: "unitType",
                type: "select",
                options: units,
                required: true
            }
        ];
    }
 
    _convertToOptions(arr) {
        const units = [];
        
        for(const key in this.props.units) {
            if(this.props.units.hasOwnProperty(key)) {
                const unit = this.props.units[key];
                units.push(
                    {
                        label: unit.name,
                        value: unit._id 
                    }
                );
            }
        }

        return units;
    }

    _onClose() {
        if(this.props.show && this.props.onClose) {
            this.props.onClose()
        }
    }

    _onSubmit(values) {
        if(this.props.onSubmit) {
            this.props.onSubmit(values);
        }
    }

    _render() {
        return (
            <Menu title="Create new Bridge" className="tagus-unit-create col-xs-9" onCloseButton={this._onClose.bind(this)} >
                <Form onSubmit={this._onSubmit.bind(this)} name="newBridge" fields={this.fields}/>
            </Menu>
        );
    }

    render() {
        const render = this.props.show ? this._render() : null;
        
        return render;
    }
}

export default CreateBridgeMenu;