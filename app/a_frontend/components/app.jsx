var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var hashHistory = require('react-router').hashHistory;
var Index = require('./index.jsx');

var App = React.createClass( {
    render: function() {
        return (
            <Router history={hashHistory} >
                <Route path="/" component={Index} />
            </Router>
        );
    }
});

ReactDOM.render( <App />, document.getElementById('admin'));
