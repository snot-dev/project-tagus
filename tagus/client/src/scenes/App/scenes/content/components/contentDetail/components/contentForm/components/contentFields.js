import React, { Component } from 'react';
import {Form, StyledText, Checkbox } from 'react-form';
import {Button} from 'react-bootstrap';
import CancelModal from '../cancelModal';
import './contentForm.css';

class ContentFields extends Component {

    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return StyledText;
            case 'checkbox':
                return Checkbox;
            default:
                break;
        }
    }

    _renderField(field) {
        const Field = this._getFieldType(field);

        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Field onChange={this._touchTheForm.bind(this)} className={`tagus-input ${field.type}`}   field={field.alias} id={field.alias} />                
            </div>
        )
    }

    render() {
        const disabled = this.state.formWasTouched ? "" : "disabled";
        return (
            <div>
                {this.props.fields.map((field, fieldIndex) => (
                    <div className="row tagus-form-control" key={field.alias+fieldIndex}>
                        {this._renderField(field, formApi)}
                    </div>
                ))}
            </div>
        );
    };
}

export default ContentFields;