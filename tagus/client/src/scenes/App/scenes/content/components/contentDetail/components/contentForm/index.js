import React, { Component } from 'react';
import {Form, Text} from 'react-form';
import {Tabs, Tab} from 'react-bootstrap';
// import store from '../../../../../../services/store';
import './contentForm.css';

class ContentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0
        }
    }

    _handleTabchange(key) {
        this.setState({key});
    }

    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return Text;
            default:
                break;
        }
    }

    _renderField(field) {
        const that = this;
        const Field = this._getFieldType(field);

        return (
            <div className="tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Field className="tagus-input"  field={field.alias} id={field.alias} />                
            </div>
        )
    }

    _renderTabs(tabs) {
        return (
            <Tabs activeKey={this.state.key} onSelect={this._handleTabchange} id="tagus-content-tabs">
                {tabs.map((tab, index) => (
                            <Tab eventKey={index} title={tab.name} key={this.props.detail._id+tab.alias+index}>
                                <Form defaultValues={this.props.detail.content[tab.alias]}>
                                    {formApi => (
                                        <form>
                                            {tab.fields.map((field, fieldIndex) => (
                                                    <div className="tagus-form-control" key={field.alias+fieldIndex}>
                                                        {this._renderField(field)}
                                                    </div>
                                                )
                                            )}
                                        </form>
                                    )}
                                </Form>
                            </Tab>
                        )
                    )
                }
            </Tabs>
        )
    }

    _getDefaultValues(tabs) {
        
    }

    render() {
        return (
            <div>
                {this.props.unit.name}
                {this._renderTabs(this.props.unit.tabs)}
            </div>
        );
    };
}

export default ContentForm;