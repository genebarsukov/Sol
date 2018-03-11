import React, { Component } from 'react';
import './data-menu.css';

class DataMenu extends Component {
    render() {
        return (
            <div className="data-menu">
                <div className="data-menu-header">
                    Energy Usage
                </div>
                <div className="data-menu-body">
                    <div className="data-menu-button"> Summary </div>
                    <div className="data-menu-button"> Usage </div>
                    <div className="data-menu-button"> Bill </div>
                    <div className="data-menu-button"> Savings </div>
                </div>
            </div>
        );
    }
}
export default DataMenu;