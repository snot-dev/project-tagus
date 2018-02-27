import React, { Component } from 'react';
import {connect} from 'react-redux';
import store from '../../services/store';
import {checkIfInstall} from '../../services/installer/actions';
import LoginForm from './components/loginForm';
import InstallerForm from './components/installerForm';
import './login.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };
    }

    componentDidMount() {
        store.dispatch(checkIfInstall());
    }

    render() {
        const showLogin = !this.props.installer.shouldInstall && this.props.installer.checkedInfo;   
        console.warn(this.props.installer);
        console.warn(showLogin);
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
                        {showLogin
                        ?   <LoginForm />
                        :   <InstallerForm />}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth,
      installer: state.installer
    };
  };
  
  export default connect(mapStateToProps)(LoginPage);