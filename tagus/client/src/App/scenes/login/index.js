import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Button from '../../components/Button';
import Overlay from '../../components/Overlay';
import store from '../../services/store';
import {login} from '../../services/auth/actions';
import './login.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
            submited: false,
            timesSubmited: false,
            fields: ['email', 'password'],
            values: {},
            valid: true,
            errorMessage: ''
        };
    }

    componentDidMount() {
        this.emailInput.focus();
    }

    componentWillReceiveProps(props) {
        console.warn(props);
        if (props.auth.result && props.auth.result.error) {
            this.setState({
                errorMessage: props.auth.result.error.message,
                valid: false
            });
        }

        if (props.auth.loggedIn) {
            this.props.history.push('/');
        }
    }

    _onChange(e) {
        const state = _.cloneDeep(this.state);
        if(!this.state.touched) {
            state.touched = true;
        }

        if (!this.state.valid) {
            state.valid = true;
            state.errorMessage = '';
        }

        state.values[e.target.name] = e.target.value;

        this.setState(state);
    }

    _getErrorMessage() {
        for (const field of this.state.fields) {
            if (!this.state.values[field]) {
                return 'All fields must be filled';
            }
        }

        return '';
    }

    _submitForm(e) {
        e.preventDefault();
        if (this.state.touched) {
            const error = this._getErrorMessage()
            const state = _.cloneDeep(this.state);
            
            state.errorMessage = error
            state.valid = !error;
    
            if (state.valid) {
                state.submited = true;
                state.timesSubmited = state.timesSubmited +1;
                state.touched = false;
                state.values = {};

                store.dispatch(login(this.state.values));
            }
            
            this.setState(state);
        }

        return false;
    }

    render() {
        return (
            <div id="tagus-login" className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                        <div className="row">
                            <div className="col-xs-12 text-center tagus-login-welcome-container">
                                Welcome
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-xs-12">
                            <div className="tagus-login-logo-container"></div>
                            </div>
                        </div>
                        <div className="row">
                            <form onSubmit={this._submitForm.bind(this)} className="tagus-login-form-container container-fluid">
                                <div className="row tagus-login-error-message-container">
                                    <div className="col-xs-12">
                                        <p className="tagus-login-error-message">{this.state.errorMessage}</p>
                                    </div>
                                </div>
                                <div className="row tagus-login-field-container">
                                    <div className="col-xs-12">
                                        <label className="tagus-label" htmlFor="email">Email</label>
                                        <input ref={(input) => { this.emailInput = input; }} value={this.state.values.email || ''} name="email" id="email" type="email" className="tagus-input" onChange={this._onChange.bind(this)} />
                                    </div>
                                </div>
                                <div className="row tagus-login-field-container">
                                    <div className="col-xs-12">
                                        <label className="tagus-label" htmlFor="password">Password</label>
                                        <input value={this.state.values.password || ''}  name="password" id="password" type="password" className="tagus-input" onChange={this._onChange.bind(this)} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                    <Button disabled={!this.state.touched} type='success' className="full-width pull-right">Submit</Button>
                                    </div>
                                </div>
                                <Overlay show={this.props.auth.loggingIn} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
  };
  
  export default connect(mapStateToProps)(LoginPage);