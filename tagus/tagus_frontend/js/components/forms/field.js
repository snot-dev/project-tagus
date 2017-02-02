import React from 'react';
var RichTextEditor = require('react-quill');

export default class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    };

    _onChange(){
        return function(e) {
            this.state = {
                name: e.target.name,
                value: e.target.value 
            };
            
            this.props.onUpdate(this.state);
        }.bind(this);
    };

    renderField(options) {
        return {
            "text": function() {
                return (
                    <input onChange={this._onChange()} type="text" id={options.name} name={options.name} className={options.classOverride || "form-field"}/>
                );
            }.bind(this),
            "textarea": function() {
                return (
                    <textarea className={options.classOverride || "form-field textarea"} name={options.name} ></textarea>
                );
            },
            "richText": function() {
                return (
                    <div className="richtext-container">
                        <RichTextEditor  theme="snow" id={options.name} name={options.name} className={options.classOverride || "form-field"}/>
                    </div>
                );
            },
            "number": function() {
                return (
                    <input type="number" id={options.name} name={options.name} className={options.classOverride || "form-field"} />
                );
            },
            "boolean": function(){
                //checked={JSON.parse(that.props.content.detail.content[options.alias] || 'false')}
                return (
                    <div className="checkbox-container">
                        <input type="checkbox" name={options.name} className={options.classOverride || "form-field"}  />
                    </div>
                );  

            },
            "email": function() {
                return (
                    <input type="email" onChange={this._onChange()} id={options.name} name={options.name} className={options.classOverride || "form-field"} />
                );
            }.bind(this),
            "password": function() {
                return (
                    <input type="password" id={options.name} name={options.name} className={options.classOverride || "form-field"} />
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
                                    <label><input type="radio" name={options.name} className={options.classOverride || "form-field"}  /> {option.name} </label><br/>
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
                    <select id={options.name} name={options.name} className={options.classOverride || "form-field"} >
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
            <label htmlFor={options.id} className={options.class}>{options.value}</label>
        )
    }

    render() {
        return (
            <div>
                {this.renderField( this.props.options )[this.props.options.type]()}
            </div>
        )
    };

};
