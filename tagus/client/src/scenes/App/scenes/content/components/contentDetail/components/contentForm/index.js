import React, { Component } from 'react';
import {Form, StyledText } from 'react-form';
import {Button} from 'react-bootstrap';
import CancelModal from './components/cancelModal';
import './contentForm.css';

class ContentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cancel: false
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
                <Field className="tagus-input"  field={field.alias} id={field.alias} />                
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

    _onSubmit(values, e, formApi) {
        this.props.detail.content[this.props.name] = values;
        this.props.onSubmit(this.props.detail);
    }

    _resetForm(formApi) {
        return () => {
            this.setState({cancel: false});
            formApi.resetAll();
        }
    }

    _toggleCancelModal(show) {
        return() => {
            this.setState({cancel: show});
        }
    }

    render() {
        return (
            <div>
                <Form dontValidateOnMount={true} validateError={this._errorValidator.bind(this)} onSubmit={this._onSubmit.bind(this)} defaultValues={this.props.defaultValues}>
                    {formApi => (
                        <form onSubmit={formApi.submitForm} className="container-fluid">
                            {this.props.fields.map((field, fieldIndex) => (
                                <div className="row tagus-form-control" key={field.alias+fieldIndex}>
                                    {this._renderField(field, formApi)}
                                </div>
                            ))}
                            <div className="row">
                                <div className="tagus-form-button-container col-xs-12">
                                    <Button type="submit" className="pull-right" bsStyle={"primary"}>Save</Button>
                                    <Button onClick={this._toggleCancelModal(true).bind(this)} className="pull-left">Cancel</Button>
                                </div>
                            </div>
                        <CancelModal show={this.state.cancel} confirmButton={this._resetForm(formApi)}  closeButton={this._toggleCancelModal(false)} />
                        </form>
                    )}
                </Form>
            </div>
        );
    };
}

export default ContentForm;