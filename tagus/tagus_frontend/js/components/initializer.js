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
                label: {
                    value: 'Username',
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
    
    render() {
        var state = {test: "this is a test"};

        return (
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <h2>Welcome to Tagus!</h2>
                <Form  class="form-horizontal" settings={this._settings} fields={this._fields} />
            </div>
        )
    }
};


ReactDOM.render(<Initializer />, document.getElementById('initializer'));
