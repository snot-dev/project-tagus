import React from 'react';
var RichTextEditor = require('react-quill');

const PROPTYPES = {
    settings: React.PropTypes.shape({
        type: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        alias: React.PropTypes.string.isRequired
    }).isRequired,
    isValid: React.PropTypes.bool.isRequired,
    errorClass: React.PropTypes.string.isRequired,
    onUpdate: React.PropTypes.func.isRequired 
};

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        
        this._defaultSettings = {
            class: 'form-field',
            parentClass: 'form-fieldset',
            label: {
                render: true,
                class: 'form-class'
            },
        };

        this._settings = Object.assign(this._defaultSettings, this.props.settings || {});

        this._field = this._getField(this._settings)[this._settings.type]() ;
        this._label = this._settings.label.render ? this.renderLabel(this._settings) : null;
    };

    _addErrorClass(){
        let errorClass = " ";

        if( !this.props.isValid) {
            errorClass = " " + this.props.errorClass;
        }
        
        return errorClass;
    };

    _onChange(){
        return (e) => {
            this.props.onUpdate({
                name: e.target.alias,
                value: e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value ): e
            });
        };
    };

    _getField(options) {
        return {
            "text": () => {
                return (
                    <input onBlur={this._onChange()} type="text" id={options.alias} name={options.alias} defaultValue={options.defaultValue} className={options.class + this._addErrorClass()}/>
                );
            },
            "textarea": () => {
                return (
                    <textarea onBlur={this._onChange()} className={options.class + this._addErrorClass()  + " textarea"} defaultValue={options.defaultValue} name={options.alias} ></textarea>
                );
            },
            "richText": () => {
                return (
                    <div className={"richtext-container " + this._addErrorClass()}>
                        <RichTextEditor onBlur={this._onChange()} theme="snow" id={options.alias} defaultValue={options.defaultValue} name={options.alias} />
                    </div>
                );
            },
            "number": () => {
                return (
                    <input type="number" onBlur={this._onChange()} id={options.alias} name={options.alias} defaultValue={options.defaultValue} className={options.class + this._addErrorClass()} />
                );
            },
            "boolean": () => {
                return (
                    <div className="checkbox-container">
                        <input type="checkbox" id={options.alias} onChange={this._onChange()} name={options.alias} defaultChecked={JSON.parse(options.defaultValue || 'false') }  />
                    </div>
                );  

            },
            "email": () => {
                return (
                    <input type="email" onBlur={this._onChange()} id={options.alias} name={options.alias} className={options.class + this._addErrorClass()} />
                );
            },
            "password": () => {
                return (
                    <input type="password" onBlur={this._onChange()} id={options.alias} name={options.alias} className={options.class + this._addErrorClass()} />
                );
            },
            "radio": () => {
                let inputs = [];
                let field;

                for(let i = 0; i < options.options.length; i++) {
                    field = options.options[i];

                    inputs.push(
                        <div key={i}>
                            <label><input type="radio" onChange={this._onChange()} value={field.value} name={options.alias} defaultChecked={JSON.parse(options.defaultValue === field.value || 'false') }   /> {field.name} </label><br/>
                        </div>   
                    )
                }

                return (
                    <div className="checkbox-container">
                        {inputs}
                    </div>
                );
            },
            "dropdown": () => {
                let fields = [];
                let opt;

                for( let i = 0; i < options.options.length; i++) {
                    opt = options.options[i];

                    fields.push(
                        <option value={opt.value} key={i} >{opt.name}</option>
                    )
                }

                return (
                    <select onChange={this._onChange()} defaultValue={options.defaultValue} id={options.alias} name={options.alias} className={options.class} >
                        {fields}
                    </select>  
                );
            }
        }
    };

    renderLabel(options){
        return (
            <label htmlFor={options.alias} className={options.label.class}>{options.name}</label>
        )
    }

    render() {
        return (
            <fieldset className={this._settings.parentClass} >
                {this._label} 
                {this._field}
            </fieldset>
        )
    };

};


Field.propTypes = PROPTYPES;