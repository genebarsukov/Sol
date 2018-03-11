import React, { Component } from 'react';
import logo from '../../logo.png';
import './app.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">
                        Sol Solar Dash
                    </h1>
                </header>
                <div className="app-body">
                    <p className="app-intro">
                        Analyze your solar energy usage stats and savings
                    </p>
                </div>
                
            </div>
        );
    }
}

export default App;
