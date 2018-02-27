import React, { Component } from 'react';
import _ from 'lodash';
import Button from '../../../../components/Button';
import Overlay from '../../../../components/Overlay';
import Form from '../../../../components/Form';
import store from '../../../../services/store';
import {login} from '../../../../services/auth/actions';

class InstallerForm extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                name: 'Email',
                alias: 'email',
                type: 'text',
                required: true
            },
            {
                name: 'Username',
                alias: 'username',
                type: 'text',
                required: true
            },
            {
                name: 'Name',
                alias: 'name',
                type: 'text',
                required: true
            },
            {
                name: 'Surname',
                alias: 'surname',
                type: 'text',
                required: true
            },
            {
                name: 'Password',
                alias: 'password',
                type: 'password',
                required: true
            },
            {
                name: 'Confirm Password',
                alias: 'confirmPassword',
                type: 'password',
                required: true
            }
        ]
    }



    render() {
        return (
            <div className="row tagus-login-form-container">
                <Form name="register" fields={this.fields} className="container-fluid" />
            </div>
        );
    }
}
 
export default InstallerForm;