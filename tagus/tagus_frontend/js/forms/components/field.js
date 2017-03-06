import React from 'react';
var RichTextEditor = require('react-quill');

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

        this._mandatoryProps = [
            {
                name: 'settings',
                childs: [
                    {name: 'type'},
                    {name: 'name'},
                    {name: 'alias'},
                ]
            },
            { name: 'isValid'},
            { name: 'errorClass'}
        ];
        
        this._errorMessage = null;
        this._validateProps(this.props);
        console.warn(this.props);
    };

    _validateProps(props){
        try {
            this._validToRender = true;

            for(let i = 0; i < this._mandatoryProps.length; i++) {
                let prop = this._mandatoryProps[i];
                this._checkIfPropertyExists(prop.alias);
                
                if( prop.childs ) {
                    for( let j = 0; j < prop.childs.length; j++) {
                        this._checkIfPropertyExists(prop.childs[j].alias, prop.alias);
                    }
                }
            }

            if(this._errorMessage && this._errorMessage.length > 0) {
                this._validToRender = false;                
                throw new Error(this._errorMessage);
            }
        }
        catch(e) {
            console.error(e.message);
        }
        finally {
            this._settings = Object.assign(this._defaultSettings, this.props.settings || {});
        }
    };

    _getErrorMessage(arg) {
        const ERROR_MESSAGES = {
            'settings': "You must pass a 'settings' proprety to this component.",
            'name': "You must pass a valid 'name' field as setting.",
            'alias': "You must pass a valid 'alias' field as setting.",
            'type': "You must pass a valid 'type' field as setting",
            'isValid': "You must pass an 'isValid' property to this component, to check if the field is valid after validation",    
            'errorClass': "You must pass an 'errorClass' property to this component, to add if this field is not valid",
            "onUpdate": "You must pass an onUpdate function to this component, to track its state"
        };

        return ERROR_MESSAGES[arg];
    };

    _checkIfPropertyExists(prop, parentProp){
        if(parentProp) {
            if(!this.props[parentProp][prop] || this.props[parentProp][prop].length === 0) {
                this._errorMessage = this._getErrorMessage(prop);
            }
        }
        else {
           if(!this.props[prop] || this.props[prop].length === 0) {
                this._errorMessage = this._getErrorMessage(prop);
            } 
        }
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

    renderField(options) {
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
                    let opt = options.options[i];

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
                {this._validToRender && this._settings.label.render ? this.renderLabel(this._settings) : null } 
                {this._validToRender ? this.renderField(this._settings)[this._settings.type]() : null }
            </fieldset>
        )
    };

};
