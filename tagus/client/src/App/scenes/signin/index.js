import React, { Component } from 'react';
import {connect} from 'react-redux';
import store from '../../services/store';
import {checkIfInstall} from '../../services/auth/actions';
import SigninForm from './components/signinForm';
import SignupForm from './components/signupForm';
import './signin.css';

class SigninPage extends Component {
    componentDidMount() {
        store.dispatch(checkIfInstall());
    }

    componentWillReceiveProps(props) {
        if (props.auth.loggedIn) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div id="tagus-login" className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                        <div className="row">
                            <div className="col-xs-12 text-center tagus-login-welcome-container">
                                Welcome to
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-xs-12">
                            <div className="tagus-login-logo-container"></div>
                            </div>
                        </div>
                        {this.props.auth.checkedInfo
                        ? this.props.auth.shouldInstall ? <SignupForm checkedInfo={this.props.auth.checkedInfo} shouldInstall={this.props.auth.shouldInstall}/> : <SigninForm auth={this.props.auth} />
                        : null}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    };
  };
  
  export default connect(mapStateToProps)(SigninPage);