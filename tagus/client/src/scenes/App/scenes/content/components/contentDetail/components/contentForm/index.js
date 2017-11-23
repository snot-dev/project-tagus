import React, { Component } from 'react';
import {Form, Text} from 'react-form';
import {Button} from 'react-bootstrap';
// import store from '../../../../../../services/store';
import './contentForm.css';

class ContentForm extends Component {
    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return Text;
            default:
                break;
        }
    }

    _renderField(field) {
        const Field = this._getFieldType(field);

        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Field className="tagus-input"  field={field.alias} id={field.alias} />                
            </div>
        )
    }

    _getDefaultValues(tabs) {
    }

    render() {
        return (
            <Form defaultValues={this.props.defaultValues}>
                {formApi => (
                    <form className="container-fluid">
                        {this.props.fields.map((field, fieldIndex) => (
                                <div className="row tagus-form-control" key={field.alias+fieldIndex}>
                                    {this._renderField(field)}
                                </div>
                            )
                        )}
                        <div className="row">
                            <div className="tagus-form-button-container col-xs-12">
                                <Button className="pull-right" bsStyle={"primary"}>Save</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Form>
        );
    };
}

export default ContentForm;