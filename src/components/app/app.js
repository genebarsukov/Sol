import React, { Component } from 'react';
import logo from '../../logo.png';
import './app.css';
import DataMenu from '../data-menu/data-menu';
import DataPage from '../data-page/data-page';
import pages from '../../pages';

class App extends Component {

    constructor() {
        super();
        this.state = {
            menuState: 'summary'
        };

    }

    /**
     * App component stores menu states
     * This method is invoked by the child data manu component
     * @param {*} newState Name of menu item clicked
     */
    setMenuState(newState) {
        this.setState({
            menuState: newState
        })
    }

    /**
     * This is used by the child data-page component to get the cureent menus state
     */
    getMenuState() {
        return this.state.menuState;
    }

    /**
     * Template rendering
     */
    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">
                        Your Solar Dashboard
                    </h1>
                </div>
                <div className="app-body">

                    <div className="main-container">
                        <DataMenu pages={ pages } 
                                  getMenuState={ this.getMenuState.bind(this) } 
                                  setMenuState={ this.setMenuState.bind(this) } />
                        <div className="page-container">
                            <DataPage pages={ pages } 
                                      getMenuState={ this.getMenuState.bind(this) } />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
export default App;
