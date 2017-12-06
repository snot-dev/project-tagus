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
                options: this.props.unit.templates,
                required: true,
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published",
                required: false,
                disabled: true
            }
        ];
    }
    
    componentWillUpdate(props) {
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
                options: props.unit.templates,
                required: true,
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published",
                required: false,
                disabled: true
            }
        ];
    }

    _createContentObject() {
        const content = {};

        for(const tab of this.props.unit.tabs) {
            content[tab.alias] = {};
        }

        return content;
    }

    onSubmit(formValues) {
        const newContent = formValues.newContent;
        
        newContent.parent = this.props.parent._id;
        newContent.url = this.props.parent.url;
        newContent.content = this._createContentObject();

        store.dispatch(createContent(newContent));
    }

    

    render() {
        return (
            <Panel title={`Create new Content under ${this.props.parent.name}`} className="col-xs-8 full-height">
            {this.props.unit.name}
                <Form onSubmit={this.onSubmit.bind(this)} name={`newContent_${this.props.unit}`} fields={this.formFields} />
            </Panel>
        );
    }
}

export default CreateContent;