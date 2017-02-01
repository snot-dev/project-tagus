import React from 'react';
import Field from './field';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this._fields = this.props.fields;
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

        this._settings = Object.assign(this._defaultSettings, this.props.settings);

    }

    renderLabel(options){
        return (
            <label htmlFor={options.name} className="form-label">{options.displayName}</label>
        )
    }

    renderFields() {
        var field;
        var fields = [];

        for( var i = 0; i < this._fields.length; i++) {
            field = this._fields[ i ];

            fields.push (
                <fieldset className={field.parentClass || "form-fieldset"} key={i}>
                    {field.label ? this.renderLabel( field ) : null}
                    <Field options={field}/>
                </fieldset>
            );
        }

        return (
            <div className="field-group">
            {fields}
            </div>
        )
    }
    

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