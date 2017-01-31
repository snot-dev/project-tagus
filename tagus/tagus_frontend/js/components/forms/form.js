import React from 'react';
import Field from './field';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this._fields = this.props.fields;
        console.log(this._fields.length);
    }

    renderLabel(options){
        return (
            <label htmlFor={options.name} className="form-label">{options.displayName}</label>
        )
    }

    renderFields() {
        var field;

        return (
            {}
        )
        for( var i = 0; i < this._fields.length; i++) {
            field = this._fields[ i ];

            console.log( field );

            return (
                <fieldset className={field.parentClass || "form-fieldset"}>
                    {field.label ? this.renderLabel( field ) : null}
                    <Field options={field}/>
                </fieldset>
            );
        }
    }
    

    render() {
        return (
            <form className={this.props.class}>
                <div className="field-group">
                    {this.renderFields()}
                </div>
            </form>
        );
    }
};  