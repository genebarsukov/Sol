import React, { Component } from 'react';
import './data-page.css';

class DataPage extends Component {
    render() {
        return (
            <div className="data-page">
                <div className="data-page-header">
                    Page Title
                </div>
                <div className="data-page-body">
                    <div className="graph-container">
                        Graph Container
                    </div>
                    <div className="table-container">
                        Table Container
                    </div>
                </div>
            </div>
        );
    }
}
export default DataPage;