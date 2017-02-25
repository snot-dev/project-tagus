import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Form from '../../forms/components/form';
import Field from '../../forms/components/field';
import store from '../../store';
import {saveUser} from '../actions/initializerActions';

class Register extends React.Component {
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
                    class: "button submit full-width",
                    id: "submitButton",
                    value: "Submit"
                }
            }
        };

       this._fields = [
            {
                type: 'text',
                name: 'username',
                class: 'form-control',
                defaultValue: '',
                label: {
                    value: 'Username',
                    class: 'form-class'
                },
                required: true
            },
            {
                type: 'email',
                name: 'email',
                class: 'form-control',
                defaultValue: '',
                label: {
                    value: 'Email',
                    class: 'form-class'
                },
                required: true
            },
            {
                type: 'password',
                name: 'password',
                class: 'form-control',
                label: {
                    value: 'Password',
                    class: 'form-class'
                },
                required: true
            }
        ];
    }
    
    _onSubmit(formState){
        if(formState) {
            formState.isAdmin = true;
            store.dispatch(saveUser(formState));
        }
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

let mapStateToProps = function(state) {
  return {
    initializer: state.initializer
  };
};

export default connect(mapStateToProps)(Register);
