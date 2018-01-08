import React, { Component } from 'react';
import Menu from '../../../../../../components/Menu';
import Form from '../../../../../../components/Form';

class CreateUnitMenu extends Component {
    componentWillMount() {
        this.fields = [
            {
                name: "Name",
                alias: "name",
                type: "text",
                required: true
            }
        ]
    }
 
    _onClose() {
        if(this.props.show && this.props.onClose) {
            this.props.onClose()
        }
    }

    _render() {
        return (
            <Menu title="Create new Unit" className="tagus-unit-create col-xs-9" onCloseButton={this._onClose.bind(this)} >
                <Form name="create-unit" fields={this.fields}/>
            </Menu>
        );
    }

    render() {
        const render = this.props.show ? this._render() : null;
        
        return render;
    }
}

export default CreateUnitMenu;