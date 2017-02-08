import React from 'react';
import Field from './field';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this._defaultSettings = {
            validation: {
                validate: true,
                onError: "error"    
            },
            buttons: {
                cancel: {
                    class: "button",
                    id: "backButton",
                    value: "Reset"
                },
                submit: {
                    class: "button submit",
                    id: "submitButton",
                    value: "Submit"
                }
            },
        };

        this._fieldsToRender = [];
        
        this.state = {
            validForm: false,
            fields: {}
        };

        this._validForm = true;

        this._settings = Object.assign(this._defaultSettings, this.props.settings);

        this._setInitialState();
    }

    _onUpdate(data) {
        var fields = this.state.fields;
        
        fields[data.name].value = data.value;

        this.setState({fields: fields});
    };

    _setInitialState() {
        var field;
        var key;

        for(var i  = 0; i < this.props.fields.length; i++) {
            field = this.props.fields[i];
            key = this.props.fields[i].name;
            
            if(key) {
                this.state.fields[key] = {
                    value: field.defaultValue,
                    valid: true
                }
                
                this._fieldsToRender.push (
                    <Field state={this.state.fields[key]} errorClass={this._settings.validation.onError}  onUpdate={this._onUpdate.bind(this)} settings={field} key={i} />
                );
            }
            else {
                console.error("Field does not have a valid name");
            }
        }
    };

    _renderFields() {
        return (
            <div className="field-group">
                {this._fieldsToRender}
            </div>
        )
    };
    
    _validateFields() {
        var field; 
        var stateField;
        var fields = this.state.fields;
        var validForm = true;

        for(var i = 0; i < this._fieldsToRender.length; i++) {
            field = this._fieldsToRender[i];

            if(fields.hasOwnProperty(field.props.settings.name)) {
                stateField = fields[field.props.settings.name];
                stateField.valid = true;
                // field.props.isValid = false;

                if(field.props.settings.required === true && (!stateField.value || stateField.value.length === 0)) {
                    validForm = false;
                    stateField.valid = false; 
                    // field.props.isValid = false;
                    console.log(field);
                }
            }
        }

        this.setState({
            validForm: validForm,
            fields: fields
        });

    };

    _onSubmit(e) {
        e.preventDefault();
        this._validateFields();

        if(this.state.validForm) {
            this.props.onSubmit();
        }
    };

    render() {
        return (
            <form onSubmit={this._onSubmit.bind(this)} className={this.props.class}>
                {this._renderFields()}
                <div className="buttonsContainer">
                    {this._settings.backButton ? <button id={this._settings.buttons.back.id} className={this._settings.buttons.back.class }> {this._settings.buttons.back.value}</button> : null }
                    <button id={this._settings.buttons.submit.id} className={this._settings.buttons.submit.class} >{this._settings.buttons.submit.value}</button>
                </div>
            </form>
        );
    };
};  