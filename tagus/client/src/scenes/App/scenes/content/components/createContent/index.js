import React, { Component } from 'react';
import {createContent} from '../../../../../../services/content/actions';
import store from '../../../../../../services/store';
import Overlay from '../../../../components/Overlay';
import Panel from '../../../../components/Panel';
import Form from '../../../../components/Form';
import './createContent.css';

class CreateContent extends Component {
    componentWillMount() {
        this.formFields = this.createFormFields(this.props.unit);
    }
    
    componentWillUpdate(props) {
        this.formFields = this.createFormFields(props.unit);
    }

    createFormFields(unit){
        return  [
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
                options: unit.templates,
                required: true,
            },
            {
                name: "Published",
                type: "checkbox",
                alias: "published"
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
        newContent.unitType = this.props.unit._id;
        newContent.url = this.props.parent.url;
        newContent.content = this._createContentObject();

        store.dispatch(createContent(newContent));
    }

    render() {
        return (
            <Panel title={`Create new Content under ${this.props.parent.name}`} className="col-xs-8 full-height">
            {this.props.unit.name}
                <Form onSubmit={this.onSubmit.bind(this)} name={`newContent`} fields={this.formFields} />
                <Overlay show={this.props.savingContent}/>
            </Panel>
        );
    }
}

export default CreateContent;