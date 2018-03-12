import React, { Component } from 'react';
import './data-row.css';


class DataRow extends Component {

    constructor() {
        super();
        
        this.state = {
            year: null,
            month: null,
            usage: null,
            bill: null,
            savings: null
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {
        this.props.updateCellValue(this.props.id, this.props.index, event.target.name, event.target.value);
    }

    getDeleteButton() {
        return (
            <div className={"delete-button-container" + (this.props.isHeader || !this.props.editable ? ' hidden' : '')}>
                <div className={"delete-button" + (this.props.isHeader || !this.props.editable ? ' hidden' : '')}
                        onClick = {() => { this.props.deleteRow(this.props.id, this.props.index)} } >
                    x
                </div>
            </div>
        );
    }

    /**
     * Template rendering
     */
    render() {
        let usageCell = null;
        let billCell = null;
        let savingsCell = null;
        let head = this.props.isHeader;
        if ((this.props.menuState === 'summary' || this.props.menuState === 'usage') &&
            ((this.props.usage !== null && this.props.usage !== undefined) || this.props.isHeader)) {
            usageCell = <input name = 'usage'
                               className = {'data-cell' + (this.props.editable ? ' editable' : ' read-only') + (head ? ' head' : '')}
                               value = {(this.props.isHeader ? 'Usage' : this.props.usage)}
                               readOnly = {!this.props.editable}
                               onChange = {this.handleChange} />
        }
        if ((this.props.menuState === 'summary' || this.props.menuState === 'bill') &&
            ((this.props.bill !== null && this.props.bill !== undefined) || this.props.isHeader)) {
            billCell = <input name = 'bill'
                              className = {'data-cell' + (this.props.editable ? ' editable' : ' read-only') + (head ? ' head' : '')}
                              value = {(this.props.isHeader ? 'Bill' : this.props.bill)}
                              readOnly = {!this.props.editable}
                              onChange = {this.handleChange} />
        }
        if ((this.props.menuState === 'summary' || this.props.menuState === 'savings') &&
            ((this.props.savings !== null && this.props.savings !== undefined) || this.props.isHeader)) {
            savingsCell = <input name = 'savings'
                                 className = {'data-cell' + (this.props.editable ? ' editable' : ' read-only') + (head ? ' head' : '')}
                                 value = {(this.props.isHeader ? 'Savings' : this.props.savings)}
                                 readOnly = {!this.props.editable}
                                 onChange = {this.handleChange} />
        }
        
        return (
            <div className={ 'data-row ' + (this.props.isHeader ? ' header-row' : '') }>
                <div className="data-row-body">
                    <input name = 'year'
                           className = {'data-cell' + (this.props.editable ? ' editable' : ' read-only') + (head ? ' head' : '')}
                           value = {(this.props.isHeader ? 'Year' : this.props.year)}
                           readOnly = {!this.props.editable}
                           onChange = {this.handleChange} />
                    <input name = 'month'
                           className = {'data-cell' + (this.props.editable ? ' editable' : ' read-only') + (head ? ' head' : '')}
                           value = {(this.props.isHeader ? 'Month' : this.props.month)}
                           readOnly = {!this.props.editable}
                           onChange = {this.handleChange} />
                    { usageCell }
                    { billCell }
                    { savingsCell }
                    { this.getDeleteButton() }
                </div>
            </div>
        );
    }
}
export default DataRow;