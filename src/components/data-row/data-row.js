import React, { Component } from 'react';
import './data-row.css';

class DataRow extends Component {

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    /**
     * Template rendering
     */
    render() {
        let usageCell = null;
        let billCell = null;
        let savingsCell = null;
        if ((this.props.usage !== null && this.props.usage !== undefined) || this.props.isHeader) {
            usageCell = <input name = 'usage'
                               className = {'data-cell' + ('' ? this.props.editable : 'read-only')}
                               value = {(this.props.isHeader ? 'Usage' : this.props.usage)}
                               readOnly = {!this.props.editable}
                               onChange = {this.handleChange} />
        }
        if ((this.props.bill !== null && this.props.bill !== undefined) || this.props.isHeader) {
            billCell = <input name = 'bill'
                              className = {'data-cell' + ('' ? this.props.editable : 'read-only')}
                              value = {(this.props.isHeader ? 'Bill' : this.props.bill)}
                              readOnly = {!this.props.editable}
                              onChange = {this.handleChange} />
        }
        if ((this.props.savings !== null && this.props.savings !== undefined) || this.props.isHeader) {
            savingsCell = <input name = 'savings'
                                 className = {'data-cell' + ('' ? this.props.editable : 'read-only')}
                                 value = {(this.props.isHeader ? 'Savings' : this.props.savings)}
                                 readOnly = {!this.props.editable}
                                 onChange = {this.handleChange} />
        }
        
        return (
            <div className="data-row">
                <div className="data-row-body">
                    <input name = 'year'
                           className = {'data-cell' + ('' ? this.props.editable : 'read-only')}
                           value = {(this.props.isHeader ? 'Year' : this.props.year)}
                           readOnly = {!this.props.editable}
                           onChange = {this.handleChange} />
                    <input name = 'month'
                           className = {'data-cell' + ('' ? this.props.editable : 'read-only')}
                           value = {(this.props.isHeader ? 'Month' : this.props.month)}
                           readOnly = {!this.props.editable}
                           onChange = {this.handleChange} />
                    { usageCell }
                    { billCell }
                    { savingsCell }
                </div>
            </div>
        );
    }
}
export default DataRow;