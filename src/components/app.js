import React, { Component } from 'react';
import logo from '../sol_100.png';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Welcome to Sol</h1>
        </header>
        <p className="app-intro">
          This is a demo app
        </p>
      </div>
    );
  }
}

export default App;
