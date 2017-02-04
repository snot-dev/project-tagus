import React from 'react';
var RichTextEditor = require('react-quill');

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this._state = { };
        this._validField = true;
        this._defaultSettings = {
            class: 'form-field',
            parentClass: 'form-fieldset'
        };
        
        try {
            this._errorMessage = '';
            if( !this.props.settings) {
                this._errorMessage = this._getErrorMessage('settings');
            }
            else if( !this.props.settings.type || this.props.settings.type.length === 0) {
                this._errorMessage = this._getErrorMessage('type');
            }
            else if( !this.props.settings.name || this.props.settings.name.length === 0) {
                this._errorMessage = this._getErrorMessage('name');
            }

            if(this._errorMessage.length > 0) {
                this._validField = false;                
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
            'type': "You must a valid 'type' field as setting"
        };

        return errorMessages[arg];
    };

    _onChange(){
        return function(e) {
            this._state = {
                name: e.target.name,
                value: e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value ): e
            };
            
            this.props.onUpdate(this._state);
        }.bind(this);
    };

    renderField(options) {
        return {
            "text": function() {
                return (
                    <input onChange={this._onChange()} type="text" id={options.name} name={options.name} className={options.class}/>
                );
            }.bind(this),
            "textarea": function() {
                return (
                    <textarea onChange={this._onChange()} className={this.options.class  + " textarea"} name={options.name} ></textarea>
                );
            },
            "richText": function() {
                return (
                    <div className="richtext-container">
                        <RichTextEditor onChange={this._onChange()} theme="snow" id={options.name} name={options.name} className={options.class}/>
                    </div>
                );
            },
            "number": function() {
                return (
                    <input type="number" onChange={this._onChange()} id={options.name} name={options.name} className={options.class} />
                );
            },
            "boolean": function(){
                //checked={JSON.parse(that.props.content.detail.content[options.alias] || 'false')}
                return (
                    <div className="checkbox-container">
                        <input type="checkbox" id={options.name} name={options.name} className={options.class}  />
                    </div>
                );  

            },
            "email": function() {
                return (
                    <input type="email" onChange={this._onChange()} id={options.name} name={options.name} className={options.class} />
                );
            }.bind(this),
            "password": function() {
                return (
                    <input type="password" onChange={this._onChange()} id={options.name} name={options.name} className={options.class} />
                );
            },
            "radio": function() {
                //checked={JSON.parse(that.props.content.detail.content[options.alias] === option.value || "false")}
                return (
                    <div className="checkbox-container">
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                <div key={index}>
                                    <label><input type="radio" name={options.name} className={this.options.class}  /> {option.name} </label><br/>
                                </div>       
                                )
                            })   
                        :   null
                        }
                    </div>
                );
            },
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
                {this._validField && this._settings.label ? this.renderLabel(this._settings) : null } 
                {this._validField ? this.renderField(this._settings)[this._settings.type]() : null }
            </fieldset>
        )
    };

};
