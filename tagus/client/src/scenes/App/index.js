import React, { Component } from 'react';
import AppBar from './components/AppBar';
import logo from './logo.svg';
import style from './style.css';

class App extends Component {
  render() {
    return (
      <div id ="tagus-app" className="App">
        <AppBar />
      </div>
    );
  }
}

export default App;
