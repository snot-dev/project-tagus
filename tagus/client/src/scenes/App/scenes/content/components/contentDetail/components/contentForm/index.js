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

    _getDefaultValues(tabs) {
        
    }

    render() {
        return (
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
        );
    };
}

export default ContentForm;