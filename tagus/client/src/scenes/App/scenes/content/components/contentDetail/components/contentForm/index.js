import React, { Component } from 'react';
import {Form, StyledText } from 'react-form';
import {Button} from 'react-bootstrap';
import CancelModal from './components/cancelModal';
import './contentForm.css';

class ContentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cancelMode: false,
            formWasTouched: false
        }
    }

    _getFieldType(field) {
        switch(field.type) {
            case'text':
                return StyledText;
            default:
                break;
        }
    }

    _renderField(field) {
        const Field = this._getFieldType(field);

        return (
            <div className="col-xs-12 tagus-form-field">
                <label className="tagus-label" htmlFor={field.alias}>{field.name}</label>
                <Field onChange={this._touchTheForm.bind(this)} className="tagus-input"  field={field.alias} id={field.alias} />                
            </div>
        )
    }

    _errorValidator(values) {
        const errors = {};

        for(const field of this.props.fields) {
            errors[field.alias] = field.required && values[field.alias] === ''?"This field is required!":null;
        }


        return errors;
    }

    //TODO: Only send if form was touched
    _onSubmit(formApi) {
        return () => {
            if(this.state.formWasTouched){
                this.props.detail.content[this.props.name] = formApi.values;
                formApi.submitForm();
                this.props.onSubmit(this.props.detail);
            }
        }
    }

    _resetForm(formApi) {
        return () => {
            this.setState({cancelMode: false});
            formApi.resetAll();
        }
    }

    _toggleCancelModal(show) {
        return() => {
            if(this.state.formWasTouched) {
                this.setState({cancelMode: show});
            }
        }
    }

    _touchTheForm() {
        if(!this.state.formWasTouched){
            this.setState({formWasTouched: true});
        }
    }

    render() {
        const disabled = this.state.formWasTouched ? "" : "disabled";
        return (
            <div>                
                <Form dontValidateOnMount={true} validateError={this._errorValidator.bind(this)} defaultValues={this.props.defaultValues}>
                    {formApi => (
                        <form onSubmit={formApi.submitForm} className="container-fluid">
                            {this.props.fields.map((field, fieldIndex) => (
                                <div className="row tagus-form-control" key={field.alias+fieldIndex}>
                                    {this._renderField(field, formApi)}
                                </div>
                            ))}
                            <div className="row">
                                <div className="tagus-form-button-container col-xs-12">
                                    <Button onClick={this._onSubmit(formApi).bind(this)} type="button" className={`pull-right ${disabled}`} bsStyle={"primary"}>Save</Button>
                                    <Button onClick={this._toggleCancelModal(true).bind(this)} className={`pull-left ${disabled}`}>Cancel</Button>
                                </div>
                            </div>
                        <CancelModal show={this.state.cancelMode} confirmButton={this._resetForm(formApi)}  closeButton={this._toggleCancelModal(false)} />
                        </form>
                    )}
                </Form>
            </div>
        );
    };
}

export default ContentForm;