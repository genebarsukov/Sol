import React, { Component } from 'react';
import './data-page.css';
import DataRow from '../data-row/data-row';

class DataPage extends Component {

    constructor() {
        super();
        this.state = {
            tableData: []
        }
    }
    
    componentDidMount() {
        this.buildDataTable(this.props.getMenuState().toLowerCase())
    }
    /**
     * Template rendering
     */
    render() {
        let tableRows = this.state.tableData
            .map(row => {
                return (
                    <DataRow
                        key={row._id}
                        year={row.year}
                        month={row.month}
                        usage={row.kwh}
                        bill={row.bill}
                        savings={row.savings==null ? ' ' : row.savings} />
                );
        });

        return (
            <div className="data-page">
                <div className="data-page-header">
                    { this.props.pages[this.props.getMenuState().toLowerCase()].title }
                </div>
                <div className="data-page-body">
                    <div className="graph-container">
                        {this.buildGraph(this.props.getMenuState().toLowerCase())}
                    </div>
                    <div className="table-container">
                        <div className="data-table">
                            <DataRow isHeader={true} editable={false} />
                            {tableRows}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    buildGraph() {
        return '';
    }

    buildDataTable(metricType=null) {

        let baseUrl = 'http://codewrencher.com:8000/sol'
        
        fetch(baseUrl + '/all')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ tableData: responseJson})
            })
            .catch(error => console.error(error));
    }

}
export default DataPage;