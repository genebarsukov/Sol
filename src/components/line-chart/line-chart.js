import React, { Component } from 'react';
import './line-chart.css';

// D3 dependencies
import * as d3Axis from 'd3-axis';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';


class LineChart extends Component {

    constructor() {
        super();

        this.state = {
            svg: null,
            line: null,
            x: null,
            y: null,
            width: 900,
            height: 350,
            margin: { top: 20, right: 20, bottom: 30, left: 50 }
        };

        this.buildChart = this.buildChart.bind(this)
    }

    componentDidMount() {
        this.buildChart();
    }
    componentDidUpdate() {
        this.buildChart();
     }

    /**
     * Build a d3 line chart from one data stream vs time
     */
    buildChart() {
        // this.setState({
        //     width: this.state.width - this.state.margin.left - this.state.margin.right,
        //     height: this.state.height - this.state.margin.top - this.state.margin.bottom
        // });
        this.clearSvg();
        let svg = this.initSvg();
        let [x, y] = this.initAxis(900, 350);
        this.drawAxis(svg, x, y);
        this.drawLine(this.formatDataForPlotting(this.props.chartData), svg, x, y);
    }

    /**
     * The chart svg needs to be cleared before it can be updated (for the most part)
     */
    clearSvg() {
        if (this.state.svg) {
            this.state.svg.selectAll('*').remove();
        }
    }

    /**
     * Set d3 to act on the svg element present in this component
     */
    initSvg() {
        let updatedSvg = d3.select('svg.line-chart-area')
                           .append('g')
                           .attr('transform', 'translate(' + this.state.margin.left + ',' + this.state.margin.top + ')');
        //this.setState({ svg: updatedSvg });

        return updatedSvg;
    }

    /**
     * Calculate our axis scaling with our current data set
     */
    initAxis(width, height) {
        let x = d3Scale.scaleTime().range([0, width]);
        let y = d3Scale.scaleLinear().range([height, 0]);
        x.domain(d3Array.extent(this.props.chartData, (d) => d.date ));
        y.domain(d3Array.extent(this.props.chartData, (d) => d.value ));
        
      //  this.setState({ x: x, y: y });

        return [x, y];
    }

    /**
     * Draw the axis on the chart svg with d2
     */
    drawAxis(svg, x, y) {
        // X axis
        svg.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + this.state.height + ')')
                .call(d3Axis.axisBottom(x));

        // Y axis left
        svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Price ($)');

        // Add X gridlines
        svg.append('g')
           .attr('class', 'grid')
           .attr('opacity', '0.1')
           .attr('transform', 'translate(0,' + this.state.height + ')')
           .call(d3Axis.axisBottom(x)
                .tickSize(-this.state.height)
                .tickFormat('')
            );

        // Add Y gridlines
        svg.append('g')
           .attr('class', 'grid')
           .attr('opacity', '0.1')
           .call(d3Axis.axisLeft(y)
                .tickSize(-this.state.width)
                .tickFormat('')
            );
    }

    makeXGridlines() {
        return d3Axis.axisBottom(this.state.x);
    }

    makeYGridlines() {
        return d3Axis.axisLeft(this.state.y);
    }

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
            color: this.props.lineColor
        }
        
        let dataKey = this.props.menuState;
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

        return formattedData;
    }

    /**
     * Create our line graph from our svg element
     * Plot our data on the chart
     * @param {*} lineData The data key of this object is an array of data point objects with date <Date> and value <number> keys
     * it is used to plot the main chart line.
     * Other parameters in this object can be used to configure the color of the line and other parameters
     */
    drawLine(lineData, svg, myX, myY) {
        let line = d3Shape.line()
                          .x( (d) => d.x )
                          .y( (d) => d.y )

        console.log(line);
        console.log(lineData.data);
        svg.append('path')
                .datum(lineData.data)
                .attr('class', 'line line-1')
                .attr('fill', 'none')
                .attr('stroke', lineData.color)
                .attr('stroke-linejoin', 'round')
                .attr('stroke-linecap', 'round')
                .attr('stroke-width', 1.5)
                .attr('d', line);
    }

    /**
     * Try to render the chart if state was updated
     */
    renderChart() {
        // if (this.state.svg) {
            return (
                <svg className="line-chart-area" 
                    width = { this.state.width }
                    height = { this.state.height } >
                </svg>
            );
        // } else {
        //     return ( <div> Loading... </div> );
        // }
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
                    { this.renderChart() }
                </div>
            </div>
        );
    }
}
export default LineChart;