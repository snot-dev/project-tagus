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

                
                    <form className="form-horizontal">
                        <fieldset>
                            <legend>
                                Please insert your Username, Email and Password:
                            </legend>
                            <div className="form-group">
                                <label className="col-xs-12" htmlFor="username">Username</label>

                            </div>
                             <div className="form-group">
                                <label className="col-xs-12" htmlFor="inputEmail">Email</label>
                                <div className="col-xs-12">
                                    <input type="email" name="email" className="form-control" id="inputEmail" />
                                </div>
                            </div>
                             <div className="form-group">
                                <label className="col-xs-12">Confirm Email</label>
                                <div className="col-xs-12">
                                    <input type="email" name="confirmEmail" className="form-control" id="inputConfirmEmail" />
                                </div>
                            </div>
                             <div className="form-group">
                                <label className="col-xs-12">Password</label>
                                <div className="col-xs-12">
                                    <input type="password" name="password lol" className="form-control" id="inputPassword" />
                                    
                                </div>
                            </div>
                        </fieldset>
                    </form>
            </div>
        )
    }
};


ReactDOM.render(<Initializer />, document.getElementById('initializer'));
