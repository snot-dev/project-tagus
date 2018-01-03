import React, { Component } from 'react';
import {StyledText, Checkbox, StyledSelect} from 'react-form';
import './formFields.css';

class FormFields extends Component {
    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return {component: StyledText};
            case 'checkbox':
                return {component: Checkbox};
            case 'select': 
                return {component: StyledSelect, options: field.options}
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
                <Component onBlur={field.onBlur} onChange={this._onFieldChange(field.onChange)} className={`tagus-input ${field.type}`}  field={field.alias} id={field.alias} options={fieldType.options} />                
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