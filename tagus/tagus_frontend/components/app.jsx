var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var Index = require('./admin/index.jsx');
var Dashboard = require('./admin/dashboard.jsx');
var Content = require('./admin/content.jsx');
var ContentDetail = require('./admin/content/contentDetail.jsx');
var Editor = require('./admin/editor.jsx');
var Settings = require('./admin/settings.jsx');
var Provider = require('react-redux').Provider;
var store = require('../adminStore');
var constants = require('../constants');
var $ = require('jquery');

var Routes =  (
    <Route path="/" component={Index} >
        <IndexRoute component={Content} />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={Content} path="/content" >
            <Route component={ContentDetail} path="/content/id" />
        </Route>
        <Route component={Editor} path="/editor" />
        <Route component={Settings} path="/settings" />
    </Route>
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={Routes} />
    </Provider>,
    document.getElementById('admin'));
