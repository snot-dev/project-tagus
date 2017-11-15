import React, { Component } from 'react';
import AppBar from './components/AppBar';
import TopBar from './components/TopBar';
import './style.css';

class App extends Component {
  render() {
    return (
      <div id ="tagus-app" className="App">
        <TopBar />
        <AppBar />
      </div>
    );
  }
}

export default App;
