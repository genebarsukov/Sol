import React, { Component } from 'react';
import './line-chart.css';

class LineChart extends Component {
    /**
     * Template rendering
     */
    render() {
        return (
            <div className="line-chart">
                <div className="line-chart-header">
                    { this.props.menuState + ' vs. time chart' }
                </div>
                <div className="line-chart-body">
                    <svg className="line-chart-area" 
                        width = { this.props.width }
                        height = { this.props.height } >
                    </svg>
                </div>
            </div>
        );
    }
}
export default DataMenu;