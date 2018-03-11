import React, { Component } from 'react';
import './line-chart.css';

// D3 dependencies
import * as d3Axis from 'd3-axis';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';

class LineChart extends Component {

    /**
     * Build a d3 line chart from one data stream vs time
     */
    buildChart() {
        this.clearSvg();
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine(line);
    }

    /**
     * The chart svg needs to be cleared before it can be updated (for the most part)
     */
    clearSvg() {
        if (this.svg) {
            this.svg.selectAll('*').remove();
        }
    }

    /**
     * Set d3 to act on the svg element present in this component
     */
    initSvg() {
        this.svg = d3.select('svg.price-chart')
                     .append('g')
                     .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    /**
     * Calculate our axis scaling with our current data set
     */
    initAxis() {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent(allData, (d) => d.date ));
        this.y.domain(d3Array.extent(allData, (d) => d.value ));
    }

    /**
     * Draw the axis on the chart svg with d2
     */
    drawAxis() {
        
        // X axis
        this.svg.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.x));

        // Y axis left
        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

        // Add X gridlines
        this.svg.append('g')
                .attr('class', 'grid')
                .attr('opacity', '0.1')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(this.makeXGridlines()
                    .tickSize(-this.height)
                    .tickFormat('')
                );

        // Add Y gridlines
        this.svg.append('g')
                .attr('class', 'grid')
                .attr('opacity', '0.1')
                .call(this.makeYGridlines()
                    .tickSize(-this.width)
                    .tickFormat('')
                );
    }


    /**
     * Create our line graph from our svg element
     * Plot our data on the chart
     * @param {*} priceLine 
     */
    drawLine(priceLine) {
        this.line = d3Shape.line()
                           .x( (d) => this.x(d.date) )
                           .y( (d) => this.y(d.value) )

        // Add the price line
        if (this.lineType === 'line') {
            this.svg.append('path')
                    .datum(priceLine.data)
                    .attr('class', 'line line-' + priceLine.index)
                    .attr('fill', 'none')
                    .attr('stroke', priceLine.color)
                    .attr('stroke-linejoin', 'round')
                    .attr('stroke-linecap', 'round')
                    .attr('stroke-width', 1.5)
                    .attr('d', this.line);
        }
    }

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