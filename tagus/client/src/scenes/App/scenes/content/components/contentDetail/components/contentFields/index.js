import React, { Component } from 'react';
import * as form from 'react-form';
import {Button} from 'react-bootstrap';
import './contentFields.css';

class ContentFields extends Component {
    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return form.StyledText;
            case 'checkbox':
                return form.Checkbox;
            default:
                break;
        }
    }

    _renderField(field) {
        const Field = this._getFieldType(field);

        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Field onChange={this.props.onFieldChange} className={`tagus-input ${field.type}`}   field={field.alias} id={field.alias} />                
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.fields.map((field, fieldIndex) => (
                    <div className="row tagus-form-control" key={field.alias+fieldIndex}>
                        {this._renderField(field)}
                    </div>
                ))}
            </div>
        );
    };
}

export default ContentFields;
