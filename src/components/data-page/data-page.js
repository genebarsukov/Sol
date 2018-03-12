import React, { Component } from 'react';
import './data-page.css';
import DataRow from '../data-row/data-row';
import LineChart, { parseFlatArray } from 'react-linechart';
import * as d3 from 'd3';
let update = require('immutability-helper');
let baseUrl = 'http://codewrencher.com:8000/sol'


class DataPage extends Component {

    constructor() {
        super();
        this.state = {
            tableData: []
        };
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
        return (
            <LineChart 
                width = { 900 }
                height = { 400 }
                data = { this.formatDataForPlotting(this.state.tableData) }
                xType={'time'}
                interpolate={'linear'}
                ticks= { 10 }
                xDisplay = {d3.timeFormat("%Y-%m-%d") }
                xLabel = { 'time '}
                yLabel = { this.props.getMenuState() + ' data' }
                margins = { { top: 50, right: 20, bottom: 30, left: 70 } } />
        );
    }
    dateString
    /**
     * Format the dataset we originally received from our database into a format d3 likes
     * The new data object will contain its plot data in an array under the data key
     * The array will consist of objects containint a Date object and a numerical value object
     * @param {*} rawData: Format: [{
     *      _id: 'id',
     *      year, 'year',
     *      month: 'month',
     *      kwh: 'kwh',
     *      bill: 'bill',
     *      savings: 'savings'
     * }]
     */
    formatDataForPlotting(rawData) {
        let formattedData = {
            data: [],
            color: 'steelblue'
        }
        let dataKey = this.props.getMenuState().toLowerCase()
        if (dataKey === 'summary') {
            return formattedData;
        }
        if (dataKey === 'usage') {
            dataKey = 'kwh';
        }

        for (let dataPoint of rawData) {
            let dateObj = new Date();
            dateObj.setFullYear(dataPoint.year, dataPoint.month, 0);

            let date = dateObj.getTime();
            let value = parseInt(dataPoint[dataKey], 10);
            formattedData.data.push({ date: date, value: value });
        }
        formattedData.data.sort(function(a,b) {return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);} );

        let flattenedData = parseFlatArray(formattedData.data, "date", ["value"]);

        return flattenedData;
    }

    /**
     * Get table data from an API
     * @param {*} metricType 
     */
    getTableData(metricType) {
        fetch(baseUrl + '/all')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ tableData: responseJson});
            })
            .catch(error => console.error(error));
    }
    
    /**
     * Update row
     */
    updateCellValue(rowId, rowIndex, columnType, value) {
        if (this.state.tableData[rowIndex]._id === rowId) {
            columnType = columnType === 'usage' ? 'kwh' : columnType;
            let recordToUpdate = update(this.state.tableData[rowIndex], {[columnType]: {$set: value}}); 
            let updatedData = update(this.state.tableData, {$splice: [[rowIndex, 1, recordToUpdate]]});
            
            this.setState({tableData: updatedData});
            this.updateRecord(recordToUpdate);
        } else {
            console.warning('Tried to update recoed by id an index do not match: ' + rowId);
        }
    }
    
    /**
     * Update record in db via API call
     */
    updateRecord(record) {
        let formBody = [];

        for (let prop in record) {
            let encodedKey = encodeURIComponent(prop);
            let encodedValue = encodeURIComponent(record[prop]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(baseUrl + '/record/' + record._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then((response) => {
            if (response.updated === record._id) {
                console.log('update successful');
            }
        })
        .catch(error => console.error(error));
    }
    /**
     * Insert row
     */
    insertRow() {
        console.log('inserting row');
    }
    /**
     * Delete row
     */
    deleteRow(rowId) {
        console.log('deleting row :' + rowId);
    }

    /**
     * Template rendering
     */
    render() {
        // Build table data rows from returned data set
        let index = -1;
        let tableRows = this.state.tableData
            .map(row => {
                index += 1;
                return (
                    <DataRow
                        id={row._id}
                        index={index}
                        key={row._id}
                        year={row.year}
                        month={row.month}
                        usage={row.kwh}
                        bill={row.bill}
                        savings={row.savings}
                        menuState={this.props.getMenuState().toLowerCase()}
                        editable={this.props.getAdminMode()}
                        updateCellValue={this.updateCellValue.bind(this)}
                        insertRow={this.insertRow.bind(this)}
                        deleteRow={this.deleteRow.bind(this)}/>
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