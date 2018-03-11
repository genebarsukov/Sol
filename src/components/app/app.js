import React, { Component } from 'react';
import logo from '../../logo.png';
import './app.css';
import DataMenu from '../data-menu/data-menu';
import DataPage from '../data-page/data-page';
import pages from '../../pages';

class App extends Component {
    // props = {
    //     pages: {

    //     }
    // };

    constructor() {
        super();
        console.log(pages);
    }

    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">
                        Sol Solar Dash
                    </h1>
                </div>
                <div className="app-body">

                    <div className="main-container">
                        <DataMenu pages={pages} />
                        <div className="page-container">
                            <div className="app-intro">
                                Analyze your solar energy usage stats and savings
                            </div>
                            <DataPage />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default App;
