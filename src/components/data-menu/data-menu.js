import React, { Component } from 'react';
import './data-menu.css';

class DataMenu extends Component {

    /**
     * The currently selected menu item state is tored in the parent App component
     * Set by this component
     * Used by DataPage component
     * @param {*} clickedItem The name of the menu item clicked
     */
    handleMenuClick(clickedItem) {
        this.props.setMenuState(clickedItem);
    }

    /**
     * Template rendering
     */
    render() {
        return (
            <div className="data-menu">
                <div className="data-menu-header">
                    Energy Usage
                </div>
                <div className="data-menu-body">
                    <div className={ "data-menu-button" + (this.props.getMenuState() ==='summary' ? ' active' : '') } onClick={ () => this.handleMenuClick('summary') }> 
                        { this.props.pages.summary.name }
                    </div>
                    <div className={ "data-menu-button" + (this.props.getMenuState() ==='usage' ? ' active' : '') } onClick={ () => this.handleMenuClick('usage') }> 
                        { this.props.pages.usage.name }
                    </div>
                    <div className={ "data-menu-button" + (this.props.getMenuState() ==='bill' ? ' active' : '') } onClick={() => this.handleMenuClick('bill') }> 
                        { this.props.pages.bill.name }
                    </div>
                    <div className={ "data-menu-button" + (this.props.getMenuState() ==='savings' ? ' active' : '') } onClick={() => this.handleMenuClick('savings') }> 
                        { this.props.pages.savings.name }
                    </div>
                </div>
            </div>
        );
    }
}
export default DataMenu;