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
            }
        };

        this._fieldstoRender = [];
        this._fields = this.props.fields;
        this._state = {};

        this._settings = Object.assign(this._defaultSettings, this.props.settings);

        this._setInitialState();
    }

    _setInitialState() {
        var field;
        var key;

        for(var i  = 0; i < this._fields.length; i++) {
            field = this._fields[i];
            key = this._fields[i].name;
            this._state[key] = field.defaultValue;

            this._fieldstoRender.push (
                <fieldset className={field.parentClass || "form-fieldset"} key={i}>
                    {field.label ? this.renderLabel( field ) : null}
                    <Field options={field}/>
                </fieldset>
            );
            
        }

    };

    renderLabel(options){
        return (
            <label htmlFor={options.name} className="form-label">{options.displayName}</label>
        )
    }

    renderFields() {
        return (
            <div className="field-group">
            {this._fieldstoRender}
            </div>
        )
    }
    
    validate() {

    };

    render() {
        return (
            <form className={this.props.class}>
                {this.renderFields()}
                <div className="buttonsContainer">
                    {this._settings.backButton ? <button id={this._settings.buttons.back.id} className={this._settings.buttons.back.class }> {this._settings.buttons.back.value}</button> : null }
                    <button id={this._settings.buttons.submit.id} className={this._settings.buttons.submit.class} >{this._settings.buttons.submit.value}</button>
                </div>
            </form>
        );
    }
};  