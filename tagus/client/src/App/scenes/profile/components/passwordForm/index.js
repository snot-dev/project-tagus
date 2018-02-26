import React, { Component } from 'react';
import Form from '../../../../components/Form';

class PasswordForm extends Component {
    constructor(props) {
        super(props);

        this.fields = [
            {
                name: 'Old Password',
                alias: 'oldPassword',
                type: 'password',
                required: true
            },
            {
                name: 'New Password',
                alias: 'newPassword',
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
            <Form name="password" fields={this.fields}/>
        )
    }
}

export default PasswordForm;