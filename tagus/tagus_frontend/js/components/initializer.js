import React from 'react';
import ReactDOM from 'react-dom';
import Form from './forms/form';
import Field from './forms/field';


class Initializer extends React.Component {
   constructor() {
       super();
        this._settings = {
            validation: {
                validate: true,
                onError: "error"
            },
            buttons: {
                cancel: null,
                submit: {
                    class: "button submit pull-right",
                    id: "submitButton",
                    value: "Submit my Form"
                }
            }
        };

       this._fields = [
            {
                type: 'text',
                name: 'username',
                class: 'form-control',
                defaultValue: 'thisIsAValue',
                parentClass:"test-class",
                label: {
                    value: 'Username',
                    class: 'form-class'
                },
                required: true
            },
            {
                type: 'password',
                name: 'password',
                class: 'form-control',
                parentClass:"test-class",
                label: {
                    value: 'Password',
                    class: 'form-class'
                },
                required: true
            },
            {
                type: 'boolean',
                name: 'boolean',
                defaultValue: true,
                class: 'form-control',
                label: {
                    value: 'Boolean',
                    class: 'form-label'
                }
            },
            {
                type: 'radio',
                name: 'radio',
                defaultValue: "3",
                class: 'form-control',
                options: [
                    {
                        name: "option1",
                        value: "1"
                    },
                    {
                        name: "option2",
                        value: "2"
                    },
                    {
                        name: "option3",
                        value: "3"
                    }
                ],
                label: {
                    value: 'Boolean',
                    class: 'form-label'
                }
            }
        ];
    }
    
    _onSubmit(){
        console.log("Submited!");
    }

    _onError() {
        console.log("Error!");
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <h2>Welcome to Tagus!</h2>
                <Form  class="form-horizontal" onError={this._onError} onSubmit={this._onSubmit} settings={this._settings} fields={this._fields} />
            </div>
        )
    }
};


ReactDOM.render(<Initializer />, document.getElementById('initializer'));
