import React from 'react';
import ReactDOM from 'react-dom';
import Form from './forms/form';
import Field from './forms/field';


class Initializer extends React.Component {
   constructor() {
       super();
       this._schema = [
            {
                type: 'text',
                name: 'username',
                displayName: 'Username',
                classOverride: 'form-control',
                parentClass:'col-xs-12',
                defaultValue: 'thisIsAValue',
                label: true,
                required: true
            },
            {
                type: 'email',
                name: 'email',
                displayName: 'Email',
                classOverride: 'form-control',
                parentClass:'col-xs-12',
                defaultValue: 'thisIsAValue',
                label: true,
                required: true
            }
        ];
   }
    
    render() {
        var state = {test: "this is a test"};

        return (
            <div>
                <Form  class="form-horizontal" fields={this._schema} />
            </div>
        )
    }
};


ReactDOM.render(<Initializer />, document.getElementById('initializer'));
