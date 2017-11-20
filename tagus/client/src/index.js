import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import './vendor/bootstrap/css/bootstrap.min.css';
import './vendor/bootstrap/css/bootstrap-theme.min.css';
import './vendor/font-awesome/css/font-awesome.min.css';
import './index.css';
import App from './scenes/App';
import registerServiceWorker from './registerServiceWorker';
import store from './services/store';


ReactDOM.render(
    <Provider store={store}>
        <HashRouter >
            <Route path="/" component={App} >
        
            </Route>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
    );
    
registerServiceWorker();
