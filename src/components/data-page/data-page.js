import React, { Component } from 'react';
import './data-page.css';

class DataPage extends Component {
    /**
     * Template rendering
     */
    render() {
        return (
            <div className="data-page">
                <div className="data-page-header">
                    { this.props.pages[this.props.getMenuState().toLowerCase()].title }
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