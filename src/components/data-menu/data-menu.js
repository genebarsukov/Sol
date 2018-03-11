import React, { Component } from 'react';
import './data-menu.css';

class DataMenu extends Component {
    render() {
        console.log(this.props.pages);
        return (
            <div className="data-menu">
                <div className="data-menu-header">
                    Energy Usage
                </div>
                <div className="data-menu-body">
                    <div className="data-menu-button"> {this.props.pages.summary.name} </div>
                    <div className="data-menu-button"> {this.props.pages.usage.name} </div>
                    <div className="data-menu-button"> {this.props.pages.bill.name} </div>
                    <div className="data-menu-button"> {this.props.pages.savings.name} </div>
                </div>
            </div>
        );
    }
}
export default DataMenu;