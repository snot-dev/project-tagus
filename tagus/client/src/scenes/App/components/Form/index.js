import React, { Component } from 'react';
import {Form} from 'react-form';
import {Button} from 'react-bootstrap';
import Modal from '../Modal';
import FormFields from './components/formFields';
import './form.css';

class CustomForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cancelMode: false,
            formWasTouched: false
        };
    }

    _errorValidator(values) {
        const errors = {};

        for(const field of this.props.fields) {

            errors[field.alias] = field.required && !values[field.alias] ?"This field is required!":null;
        }


        return errors;
    }

    _onSubmit(formApi) {
        return () => {
            this._formHasErrors(formApi);
            if(this.state.formWasTouched && !this._formHasErrors(formApi)){
                const formValues = {};

                formValues[this.props.name] = formApi.values;

                if(this.props.onSubmit){
                    this.props.onSubmit(formValues);
                }
                
                formApi.submitForm();
            }
        };
    }

    _formHasErrors(formApi) {
        let error = false;
        const formErrors = formApi.errors;

        for(const key in formErrors) {
            if(formErrors.hasOwnProperty(key) && formErrors[key]) {
                error = true;
                break;
            }
        }

        return error;
    }

    _resetForm(formApi) {
        return () => {
            this.setState({cancelMode: false});
            formApi.resetAll();
        };
    }

    _toggleCancelModal(show) {
        return() => {
            if(this.state.formWasTouched) {
                this.setState({cancelMode: show});
            }
        };
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
                        <FormFields formApi={formApi} submits={formApi.submits} formName={this.props.formName} onFieldChange={this._touchTheForm.bind(this)} fields={this.props.fields} />
                        {this.props.children ?  React.cloneElement(this.props.children, {...this.props}) : null}
                        <div className="row">
                            <div className="tagus-form-button-container col-xs-12">
                                <Button onClick={this._onSubmit(formApi).bind(this)} type="button" className={`pull-right ${disabled}`} bsStyle={"primary"}>Save</Button>
                                <Button onClick={this._toggleCancelModal(true).bind(this)} className={`pull-left ${disabled}`}>Cancel</Button>
                            </div>
                        </div>
                        <Modal title="Warning!" body="Are you sure you want to discard all changes?" show={this.state.cancelMode} confirmButton={{onClick:this._resetForm(formApi), text: "Discard Changes!"}}  closeButton={{onClick: this._toggleCancelModal(false), text: "Cancel"}} />
                    </form>
                )}
            </Form>
        );
    };

}

export default CustomForm;