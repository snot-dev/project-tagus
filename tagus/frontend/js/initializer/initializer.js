import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Register from './components/register';

import store from '../store';

var Routes =  (
    <Route path="/" component={Register} >
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={Routes} />
    </Provider>,
    document.getElementById('initializer')
    );