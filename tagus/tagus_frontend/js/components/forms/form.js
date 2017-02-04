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
        this._fields = this.props.fields;
        this._state = {};
        this._validForm = true;

        this._settings = Object.assign(this._defaultSettings, this.props.settings);

        this._setInitialState();
    }

    _onUpdate(data) {
        this._state[data.name] = data.value;
    };

    _setInitialState() {
        var field;
        var key;

        for(var i  = 0; i < this._fields.length; i++) {
            field = this._fields[i];
            key = this._fields[i].name;
            
            if(key && key.length > 0) {
                this._state[key] = field.defaultValue;
                
                this._fieldstoRender.push (
                    <Field onUpdate={this._onUpdate.bind(this)} settings={field} key={i} />
                );
            }
        }
    };

    _renderFields() {
        return (
            <div className="field-group">
                {this._fieldstoRender}
            </div>
        )
    }
    
    _validate() {
        var field; 

        this._validForm = true;

        for(var i = 0; i < this.props.fields.length; i++) {
            field = this.props.fields[i];

            if(field.name in this._state) {
                if(field.required === true && (!this._state[field.name] || this._state[field.name].length === 0) ) {
                    this._validForm = false;
                }
            }
        }

        return this._validForm;

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
    }
};  