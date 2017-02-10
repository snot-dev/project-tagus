import React from 'react';
var RichTextEditor = require('react-quill');

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        
        this._defaultSettings = {
            class: 'form-field',
            parentClass: 'form-fieldset'
        };

        this._mandatoryProps = [
            {
                name: 'settings',
                childs: [
                    {name: 'type'},
                    {name: 'name'}
                ]
            },
            { name: 'isValid'},
            { name: 'errorClass'}
        ];
        
        this._validateProps(this.props);
    };

    _validateProps(props){
        try {
            this._errorMessage = '';
            this._validToRender = true;

            for(var i = 0; i < this._mandatoryProps.length; i++) {
                var prop = this._mandatoryProps[i];
                this._checkIfPropertyExists(prop.name);
                
                if( prop.childs ) {
                    for( var j = 0; j < prop.childs.length; j++) {
                        this._checkIfPropertyExists(prop.childs[j].name, prop.name);
                    }
                }
            }

            if(this._errorMessage.length > 0) {
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
        var errorMessages = {
            'settings': "You must pass a 'settings' proprety to this component.",
            'name': "You must pass a valid 'name' field as setting.",
            'type': "You must pass a valid 'type' field as setting",
            'isValid': "You must pass an 'isValid' property to this component, to check if the field is valid after validation",    
            'errorClass': "You must pass an 'errorClass' property to this component, to add if this field is not valid"
        };

        return errorMessages[arg];
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
        var errorClass = " ";

        if( !this.props.isValid) {
            errorClass = " " + this.props.errorClass;
        }
        
        return errorClass;
    };

    _onChange(){
        return function(e) {
            this.props.onUpdate({
                name: e.target.name,
                value: e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value ): e
            });
        }.bind(this);
    };

    renderField(options) {
        return {
            "text": function() {
                return (
                    <input onBlur={this._onChange()} type="text" id={options.name} name={options.name} defaultValue={options.defaultValue} className={options.class + this._addErrorClass()}/>
                );
            }.bind(this),
            "textarea": function() {
                return (
                    <textarea onBlur={this._onChange()} className={options.class + this._addErrorClass()  + " textarea"} defaultValue={options.defaultValue} name={options.name} ></textarea>
                );
            }.bind(this),
            "richText": function() {
                return (
                    <div className="richtext-container">
                        <RichTextEditor onBlur={this._onChange()} theme="snow" id={options.name} name={options.name} className={options.class + this._addErrorClass()}/>
                    </div>
                );
            },
            "number": function() {
                return (
                    <input type="number" onBlur={this._onChange()} id={options.name} name={options.name} defaultValue={options.defaultValue} className={options.class + this._addErrorClass()} />
                );
            }.bind(this),
            "boolean": function(){
                return (
                    <div className="checkbox-container">
                        <input type="checkbox" id={options.name} onChange={this._onChange()} name={options.name} className={options.class} defaultChecked={JSON.parse(options.defaultValue || 'false') }  />
                    </div>
                );  

            }.bind(this),
            "email": function() {
                return (
                    <input type="email" onBlur={this._onChange()} id={options.name} name={options.name} className={options.class + this._addErrorClass()} />
                );
            }.bind(this),
            "password": function() {
                return (
                    <input type="password" onBlur={this._onChange()} id={options.name} name={options.name} className={options.class + this._addErrorClass()} />
                );
            }.bind(this),
            "radio": function() {
                //checked={JSON.parse(that.props.content.detail.content[options.alias] === option.value || "false")}
                return (
                    <div className={this.options.class}>
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                <div key={index}>
                                    <label><input type="radio" name={options.name} className={options.class}  /> {option.name} </label><br/>
                                </div>       
                                )
                            })   
                        :   null
                        }
                    </div>
                );
            }.bind(this),
            "dropdown": function() {
                return (
                    <select id={options.name} name={options.name} className={options.class} >
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                    <option value={option.value} key={index}>{option.name}</option>      
                                )
                            })   
                        :   null
                        }
                    </select>  
                );
            }
        }
    };

    renderLabel(options){
        return (
            <label htmlFor={options.id} className={options.label.class}>{options.label.value}</label>
        )
    }

    render() {
        return (
            <fieldset className={this._settings.parentClass} >
                {this._validToRender && this._settings.label ? this.renderLabel(this._settings) : null } 
                {this._validToRender ? this.renderField(this._settings)[this._settings.type]() : null }
            </fieldset>
        )
    };

};
