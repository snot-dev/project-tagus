import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Index from './index';
import Content from './content';
import Units from './units';
import UnitFields from './unitFields';
import UnitDetail from './units/detail';
import ContentDetail from './content/detail';
import Editor from './editor';
import Settings from './settings';
import store from '../../store';

var Routes =  (
    <Route path="/" component={Index} >
        <IndexRoute component={Content} />
        <Route component={Content} path="/content" >
            <Route component={ContentDetail} path="/content/:id" />
        </Route>
        <Route component={Units} path="/units" >
            <Route component={UnitDetail} path="/units/:id" />
        </Route>
        <Route component={UnitFields} path="/unitFields" >
            <Route component={UnitDetail} path="/units/:id" />
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
