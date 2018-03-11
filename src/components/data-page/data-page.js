import React, { Component } from 'react';
import './data-page.css';
import DataRow from '../data-row/data-row';
import LineChart from '../line-chart/line-chart';

class DataPage extends Component {

    constructor() {
        super();
        this.state = {
            tableData: []
        }
    }
    
    /**
     * Get table data from API on each page load
     */
    componentDidMount() {
        this.getTableData(this.props.getMenuState().toLowerCase())
    }

    /**
     * Render a chart component
     * @param {*} metricType What kind of data will be displayed on the chart
     */
    renderChart(metricType) {
        return ( <LineChart  menuState = { metricType } lineColor = { 'steelblue' } /> );
    }

    /**
     * Get table data from an API
     * @param {*} metricType 
     */
    getTableData(metricType) {
        let baseUrl = 'http://codewrencher.com:8000/sol'

        fetch(baseUrl + '/all')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ tableData: responseJson});
            })
            .catch(error => console.error(error));
    }
    
    /**
     * Template rendering
     */
    render() {
        // Build table data rows from returned data set
        let tableRows = this.state.tableData
            .map(row => {
                return (
                    <DataRow
                        key={row._id}
                        year={row.year}
                        month={row.month}
                        usage={row.kwh}
                        bill={row.bill}
                        savings={row.savings}
                        menuState={this.props.getMenuState().toLowerCase()}/>
                );
        });

        // Do not build graph for summary page
        let graphContainer = null;

        if (this.props.getMenuState().toLowerCase() !== 'summary') {
            graphContainer = <div className="graph-container">
                { this.renderChart(this.props.getMenuState().toLowerCase()) }
            </div>
        }

        return (
            <div className="data-page">
                <div className="data-page-header">
                    { this.props.pages[this.props.getMenuState().toLowerCase()].title }
                </div>
                <div className="data-page-body">
                    { graphContainer }
                    <div className="table-container">
                        <div className="data-table">
                            <DataRow isHeader = { true } editable = { false } menuState = { this.props.getMenuState().toLowerCase() } />
                            { tableRows }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default DataPage;