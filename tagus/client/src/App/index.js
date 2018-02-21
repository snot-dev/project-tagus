import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import AppBar from './components/AppBar';
import TopBar from './components/TopBar';
import AppContainer from './components/AppContainer';
import Messages from './components/Messages';
import Content from './scenes/content';
import Units from './scenes/units';
import Bridges from './scenes/bridges';
import Translates from './scenes/translates';
import Users from './scenes/users';
import Overlay from './components/Overlay';
import store from './services/store';
import {logoff, getLoggedUser} from './services/auth/actions';
import  './app.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.routes = [
      {
        name: "Content",
        path: this._generatePath(props, '/content'),
        component: Content,
        icon: 'file'
      },
      {
        name: "Units",
        path: this._generatePath(props, '/units'),
        component: Units,
        icon: 'ship'
      },
      {
        name: "Bridges",
        path: this._generatePath(props, '/bridges'),
        component: Bridges,
        icon: 'life-ring'
      },
      {
        name: "Translates",
        path: this._generatePath(props, '/translates'),
        component: Translates,
        icon: 'list'
      },
      {
        name: "Users",
        path: this._generatePath(props, '/users'),
        component: Users,
        icon: 'users'
      }
    ];
  }

  _generatePath(props, path) {
    return `${props.match.url}${path}`;
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      store.dispatch(getLoggedUser());
    }
  }

  _logoff() {
    store.dispatch(logoff());
    this.props.history.push('/login');
  }

  render() {
    return (  
      <div id ="tagus-app" className="App container-fluid">
        <Messages />
        <TopBar onLogoffClick={this._logoff.bind(this)} user={this.props.auth.user} />
        <AppBar routes={this.routes} />
        <AppContainer>
          {this.routes.map((route, index) => {
            return(
              <Route key={`${index}_${route.name}`} path={route.path} component={route.component} />
            );
          })}
        </AppContainer>
        <Overlay show={this.props.auth.fetchingLoggedUser} />
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
