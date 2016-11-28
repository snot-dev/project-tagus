import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Index from './admin/index';
import Dashboard from './admin/dashboard';
import Content from './admin/content';
import ContentDetail from './admin/content/contentDetail';
import Editor from './admin/editor';
import Settings from './admin/settings';
import store from '../adminStore';

console.log(Content);

var Routes =  (
    <Route path="/" component={Index} >
        <IndexRoute component={Content} />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={Content} path="/content" >
            <Route component={ContentDetail} path="/content/:id" />
        </Route>
        <Route component={Editor} path="/editor" />
        <Route component={Settings} path="/settings" />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={Routes} />
    </Provider>,
    document.getElementById('admin')
    );
