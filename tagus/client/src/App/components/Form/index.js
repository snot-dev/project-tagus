import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-form';
import Modal from '../Modal';
import FormButtons from '../FormButtons';
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

    componentWillReceiveProps(nextProps) {
        if(typeof nextProps.disabled !== undefined) {
            this.setState({
                formWasTouched: !nextProps.disabled
            });
        }
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
            this.setState({
                cancelMode: false,
                 formWasTouched: false
                });
                
            if(this.props.onReset) {
                this.props.onReset();
            }
            formApi.resetAll();
        };
    }

    _toggleCancelModal(show) {
        return() => {
            const disabled = !this.state.formWasTouched;
            if(!disabled) {
                this.setState({cancelMode: show});
            }
        };
    }

    _touchTheForm(formApi) {
        return () => {
            if(!this.state.formWasTouched){
                this.setState({formWasTouched: true});
            }
        }
    }

    render() {
        const buttons = this.props.buttons || true;
        const disabled = !this.state.formWasTouched;

        return (
            <Form className="tagus-form" dontValidateOnMount={true} validateError={this._errorValidator.bind(this)} defaultValues={this.props.defaultValues}>
                {formApi => (
                    <form onSubmit={formApi.submitForm} className="container-fluid">
                        <FormFields formApi={formApi} submits={formApi.submits} formName={this.props.name} onFieldChange={this._touchTheForm(formApi.getFormState())} fields={this.props.fields} />
                        {this.props.children}
                        {buttons 
                        ?   <FormButtons onSubmit={this._onSubmit(formApi).bind(this)} onReset={this._toggleCancelModal(true).bind(this)} disabled={disabled} />
                        :   null 
                        }
                        <Modal type='warning' title="Warning!" body="Are you sure you want to discard all changes?" show={this.state.cancelMode} confirmButton={{onClick:this._resetForm(formApi), text: "Discard Changes!"}}  closeButton={{onClick: this._toggleCancelModal(false), text: "Cancel"}} />
                    </form>
                )}
            </Form>
        );
    };
}

CustomForm.propTypes = {
    name: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    defaultValues: PropTypes.object,
    onReset: PropTypes.func,
    onSubmit: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]),
    buttons: PropTypes.bool
};

export default CustomForm;