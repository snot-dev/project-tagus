import React, { Component } from 'react';
import {createContent} from '../../../../../../services/content/actions';
import store from '../../../../../../services/store';
import Overlay from '../../../../components/Overlay';
import Panel from '../../../../components/Panel';
import Form from '../../../../components/Form';
import './createContent.css';

class CreateContent extends Component {
    constructor(props) {
        super(props);

        this.formFields = [];
    }
    
    componentWillMount() {
        const units = this._getUnitsOptions();

        this.formFields = [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true
            },
            {
                name: "Unit",
                type: "select",
                alias: "unitType",
                options: units,
                required: true
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published",
                required: false,
                disabled: true
            },
        ];
    }
    
    _getUnitsOptions(){
        const units = [];
        
        for(const key in this.props.units) {
            if(this.props.units.hasOwnProperty(key)) {
                const unit = this.props.units[key];

                units.push({
                    label: unit.name,
                    value: unit._id
                });
            }
        }

        return units;
    }

    _createContentObject(unitId) {
        const content = {};
        const unit = this.props.units[unitId];

        for(const tab of unit.tabs) {
            content[tab.alias] = {};
        }

        return content;
    }

    onSubmit(formValues) {
        const newContent = formValues.newContent;
        
        newContent.parent = this.props.parent._id;
        newContent.url = this.props.parent.url;
        newContent.content = this._createContentObject(newContent.unitType);

        store.dispatch(createContent(newContent));
    }

    

    render() {
        return (
            <Panel title={`Create new Content under ${this.props.parent.name}`} className="col-xs-8 full-height">
                <Form onSubmit={this.onSubmit.bind(this)} name="newContent" fields={this.formFields} />
            </Panel>
        );
    }
}

export default CreateContent;