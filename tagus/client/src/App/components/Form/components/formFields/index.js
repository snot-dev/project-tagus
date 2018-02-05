import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyledText, Checkbox, StyledSelect, FormField } from 'react-form';
import RichTextEditor from '../../../RichTextEditor';
import './formFields.css';

class FormFields extends Component {
    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return {component: StyledText};
            case 'checkbox':
            case 'trueOrFalse':
                return {component: Checkbox};
            case 'select': 
            case 'dropdownList':
                return {component: StyledSelect, options: field.options || []}
            case 'richTextEditor': 
                return {component: FormField(RichTextEditor)};
            default:
                return {component: StyledText};
        }
    }

    _onFieldChange(fieldOnChangeFunc) {
        return (value) => {
            this.props.onFieldChange();

            if( fieldOnChangeFunc ) {
                fieldOnChangeFunc(value);
            }
        }
    }

    _onFieldBlur(fieldOnBlurFunc) {
        return () => {
            if( fieldOnBlurFunc) {
                fieldOnBlurFunc(this.props.formApi);
            }
         };
    }

    _renderField(field) {
        const fieldType = this._getFieldType(field);
        
        const Component = fieldType.component;

        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Component onBlur={this._onFieldBlur(field.onBlur)} onChange={this._onFieldChange(field.onChange)} className={`tagus-input ${field.type}`}  field={field.alias} id={field.alias} options={fieldType.options} />                
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

FormFields.propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    formApi: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    submits: PropTypes.number.isRequired
};

export default FormFields;
