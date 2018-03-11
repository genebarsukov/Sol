import React, { Component } from 'react';
import './data-row.css';

class DataRow extends Component {
    render() {
        return (
            <div className="data-row">
                <div className="data-row-body">
                    <div className="data-cell"> Year </div>
                    <div className="data-cell"> Month </div>
                    <div className="data-cell"> Usage </div>
                    <div className="data-cell"> Bill </div>
                    <div className="data-cell"> Savings </div>
                </div>
            </div>
        );
    }
}
export default DataRow;