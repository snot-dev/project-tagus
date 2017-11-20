import React, { Component } from 'react';
import AppBar from './components/AppBar';
import TopBar from './components/TopBar';
import AppContainer from './components/AppContainer';
import Panel from './components/Panel';
import  './style.css';

class App extends Component {
  render() {
    return (
      <div id ="tagus-app" className="App">
        <TopBar />
        <AppBar />
        <AppContainer>
          <Panel className="col-xs-4"/>
          <Panel className="col-xs-8"/>
        </AppContainer>
      </div>
    );
  }
}

export default App;
