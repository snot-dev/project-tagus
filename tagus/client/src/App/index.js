import React, { Component } from 'react';
import AppBar from './components/AppBar';
import TopBar from './components/TopBar';
import AppContainer from './components/AppContainer';
import Messages from './components/Messages';
import Content from './scenes/content';
import Units from './scenes/units';
import Bridges from './scenes/bridges';
import {Route} from 'react-router-dom';
import  './app.css';

class App extends Component {
  render() {
    return (  
      <div id ="tagus-app" className="App container-fluid">
        <Messages />
        <TopBar />
        <AppBar />
        <AppContainer>
          <Route path="/content" component={Content} />
          <Route path="/units" component={Units} />
          <Route path="/bridges" component={Bridges} />
        </AppContainer>
      </div>
    );
  }
}

export default App;
