import React, { Component } from 'react';
import {StyledText, Checkbox, Select} from 'react-form';
import './formFields.css';

class FormFields extends Component {
    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return {component: StyledText};
            case 'checkbox':
                return {component:Checkbox};
            case 'select': 
                return {component: Select, options: field.options}
            default:
                return {component: StyledText};
        }
    }

    _renderField(field) {
        const fieldType = this._getFieldType(field);
        
        const Component = fieldType.component;

        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Component  onChange={this.props.onFieldChange} className={`tagus-input ${field.type}`}  field={field.alias} id={field.alias} options={fieldType.options} />                
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.fields.map((field, fieldIndex) => (
                    <div className="row tagus-form-control" key={`${field.alias}_${this.props.submits}_${fieldIndex}`}>
                        {this._renderField(field)}
                    </div>
                ))}
            </div>
        );
    };
}

export default FormFields;
