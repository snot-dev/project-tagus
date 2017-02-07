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

        this._fieldstoRender = [];
        this.props.fields;
        
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
        var field = fields[data.name];

        
        field = {
            value: data.value,
            valid: true
        };

        this.setState(fields);

        console.warn(this.state);
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
                
                this._fieldstoRender.push (
                    <Field isValid={this.state.fields[key].valid} errorClass={this._settings.validation.onError}  onUpdate={this._onUpdate.bind(this)} settings={field} key={i} />
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
                {this._fieldstoRender}
            </div>
        )
    };
    
    _validate() {
        var field; 
        var validForm = true;

        for(var i = 0; i < this._fieldstoRender.length; i++) {
            field = this._fieldstoRender[i];

            if(field.props.settings.required === true && (!this.state.fields[field.name] || this.state.fields[field.name].value.length === 0) ) {
                validForm = false;
            }
        }

        this.setState({
            validForm: validForm
        })

        return validForm;
    };

    _onSubmit(e) {
        e.preventDefault();
        
        if(this._validate()) {
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