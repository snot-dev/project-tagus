import React from 'react';
var RichTextEditor = require('react-quill');

export default class Field extends React.Component {
        renderField(options) {
        
        return {
            "text": function() {
                return (
                    <input type="text" id={options.id} name={options.name} className={options.class}/>
                );
            }.bind(this),
            "textarea": function() {
                return (
                    <textarea className="form-field textarea" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]}  name={options.alias} ></textarea>
                );
            },
            "richText": function() {
                return (
                    <div className="richtext-container">
                        <RichTextEditor  theme="snow" onChange={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]}  name={options.alias}/>
                    </div>
                );
            },
            "number": function() {
                return (
                    <input type="number" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias} />
                );
            },
            "boolean": function(){
                return (
                    <div className="checkbox-container">
                        <input type="checkbox" onChange={that.handleBlur(options)} name={options.alias} checked={JSON.parse(that.props.content.detail.content[options.alias] || 'false')} />
                    </div>
                );

            },
            "email": function() {
                return (
                    <input type="email" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias} />
                );
            },
            "password": function() {
                return (
                    <input type="password" className="form-field" onBlur={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias} />
                );
            },
            "radio": function() {
                return (
                    <div className="checkbox-container">
                        {options.options.length > 0 
                        ?   options.options.map(function(option, index) {
                                return(
                                <div key={index}>
                                    <label><input type="radio" onChange={that.handleBlur(options)} name={options.alias} value={option.value} checked={JSON.parse(that.props.content.detail.content[options.alias] === option.value || "false")} /> {option.name} </label><br/>
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
                    <select className="form-field" onChange={that.handleBlur(options)} defaultValue={that.props.content.detail.content[options.alias]} name={options.alias}>
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
                {this.renderField( {name: this.props.name, id: this.props.id, class: this.props.class })[this.props.type]()}
            </div>
        )
    };

};
