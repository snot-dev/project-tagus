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
        this.templates = [{}];
    }
    
    componentWillMount() {
        this.templates = this.props.unit.templates;

        this.formFields = [
            {
                name: "Name",
                type: "text",
                alias: "name",
                required: true
            },
            {
                name: "Template",
                type: "select",
                alias: "template",
                options: this.templates,
                required: true,
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
    
    componentWillUpdate(props) {
        this.templates = props.unit.templates;
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
            {this.props.unit.name}
                <Form onSubmit={this.onSubmit.bind(this)} name="newContent" fields={this.formFields} />
            </Panel>
        );
    }
}

export default CreateContent;