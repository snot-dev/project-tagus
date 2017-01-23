import React from 'react';
import ReactDOM from 'react-dom';

class Initializer extends React.Component {
    render() {
        return (
            <div>
                <h2>Welcome to Tagus CMS</h2>
                    <form className="form-horizontal">
                        <fieldset>
                            <legend>
                                Please insert your Username, Email and Password:
                            </legend>
                            <div className="form-group">
                                <label className="col-xs-12" htmlFor="username">Username</label>
                                <div className="col-xs-12">
                                    <input type="text" name="username" className="form-control" id="inputUsername" />
                                </div>
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
