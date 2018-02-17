import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/bootstrap/css/bootstrap-theme.min.css';
import './vendor/font-awesome/css/font-awesome.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './App/services/store';


ReactDOM.render(
    <Provider store={store}>
        <HashRouter >
            <Switch>
                <Route path="/" component={App} />
                <Redirect to="/" />
            </Switch>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
    );
    
registerServiceWorker();
