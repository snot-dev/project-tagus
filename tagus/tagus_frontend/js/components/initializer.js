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
                displayName: 'Username',
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
                displayName: 'Password',
                class: 'form-control',
                parentClass:"test-class",
                label: {
                    value: 'Password',
                    class: 'form-class'
                },
                required: true
            },
            {
                type: 'textarea',
                name: 'textarea',
                displayName: 'Textarea',
                class: 'form-control',
                defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed volutpat massa. Fusce lobortis turpis dui, eget tempus felis pretium feugiat.',
                parentClass:"test-class",
                label: {
                    value: 'Textarea',
                    class: 'form-class'
                },
                required: true
            },
            {
                type: 'number',
                name: 'number',
                displayName: 'Number',
                class: 'form-control',
                defaultValue: 1,
                parentClass:"test-class",
                label: {
                    value: 'Number',
                    class: 'form-class'
                },
                required: true
            },
            {
                type: 'text',
                name: '',
                displayName: 'Username',
                class: 'form-control',
                defaultValue: 'thisIsAValue',
                label: {
                    value: 'Username',
                    class: 'form-label'
                },
                required: true
            },
            {
                type: 'email',
                name: 'email',
                displayName: 'Email',
                class: 'form-control',
                label: {
                    value: 'Email',
                    class: 'form-label'
                },
                required: true
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
