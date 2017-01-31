import React from 'react';
import Field from './field';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this._fields = this.props.fields;
        this._fieldstoRender = [];
        console.log(this._fields.length);
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
            </form>
        );
    }
};  