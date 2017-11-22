import React, { Component } from 'react';
import AppBar from './components/AppBar';
import TopBar from './components/TopBar';
import AppContainer from './components/AppContainer';
import Content from './scenes/content';
import Units from './scenes/units';
import {Route} from 'react-router-dom';
import  './app.css';

class App extends Component {
  render() {
    return (
      <div id ="tagus-app" className="App">
        <TopBar />
        <AppBar />
        <AppContainer>
          <Route path="/content" component={Content} />
          <Route path="/units" component={Units} />
        </AppContainer>
      </div>
    );
  }
}

export default App;
