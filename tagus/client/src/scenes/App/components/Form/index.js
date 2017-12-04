import React, { Component } from 'react';
import {Form} from 'react-form';
import {Button} from 'react-bootstrap';
import CancelModal from './components/cancelModal';
import FormFields from './components/formFields';
import './form.css';

class CustomForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cancelMode: false,
            formWasTouched: false
        }
    }

    _errorValidator(values) {
        const errors = {};

        for(const field of this.props.fields) {
            errors[field.alias] = field.required && values[field.alias] === ''?"This field is required!":null;
        }


        return errors;
    }

    _onSubmit(formApi) {
        return () => {
            if(this.state.formWasTouched){
                const formValues = {};

                formValues[this.props.name] = formApi.values;
                this.props.onSubmit(formValues);
                formApi.submitForm();
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
            <Form className="tagus-form" dontValidateOnMount={true} validateError={this._errorValidator.bind(this)} defaultValues={this.props.defaultValues}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} className="container-fluid">
                        <FormFields submits={formApi.submits} formName={this.props.formName} onFieldChange={this._touchTheForm.bind(this)} fields={this.props.fields} />
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
        );
    };

}

export default CustomForm;