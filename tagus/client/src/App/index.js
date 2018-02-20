import React, { Component } from 'react';
import {connect} from 'react-redux';
import AppBar from './components/AppBar';
import TopBar from './components/TopBar';
import AppContainer from './components/AppContainer';
import Messages from './components/Messages';
import Content from './scenes/content';
import Units from './scenes/units';
import Bridges from './scenes/bridges';
import Translates from './scenes/translates';
import Users from './scenes/users';
import {Route} from 'react-router-dom';
import store from './services/store';
import {logoff} from './services/auth/actions';
import  './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.routes = [
      {
        name: "Content",
        path: '/content',
        component: Content,
        icon: 'file'
      },
      {
        name: "Units",
        path: '/units',
        component: Units,
        icon: 'ship'
      },
      {
        name: "Bridges",
        path: '/bridges',
        component: Bridges,
        icon: 'life-ring'
      },
      {
        name: "Translates",
        path: '/translates',
        component: Translates,
        icon: 'list'
      },
      {
        name: "Users",
        path: '/users',
        component: Users,
        icon: 'users'
      }
    ];
  }

  componentDidMount() {
    //check if theres a token and fetch user
    console.warn(this.props);
  }

  _logoff() {
    store.dispatch(logoff());
    this.props.history.push('/login');
  }

  render() {
    return (  
      <div id ="tagus-app" className="App container-fluid">
        <Messages />
        <TopBar onLogoffClick={this._logoff.bind(this)} />
        <AppBar routes={this.routes} />
        <AppContainer>
          {this.routes.map((route, index) => {
            return(
              <Route key={`${index}_${route.name}`} path={route.path} component={route.component} />
            );
          })}
        </AppContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(App);
