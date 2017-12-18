import React, { Component } from 'react'
import InfoPopup from './InfoPopup'
import TableHtml from './TableHtml'
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
const HighchartsExporting = require('highcharts/modules/exporting')
HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);

/**
 * Chart
 * Created:     2017-12-xx (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Single Scenario chart
 */

class Chart extends Component {

    constructor(props){
        super(props);

        this.labels = [];           //chart labels 
        this.data = [];             //indicator values
        this.chartType = 'polar';   //default type

        this.getValue = this.getValue.bind(this);       //get this values from all values
        this.setValues = this.setValues.bind(this);     //save this value to array
    }
   
    /**
     * getValue
     * @param {*} key 
     * 
     * Reads all values and pics values for this chart only
     */
    getValue(key){
        let myValue = 0;
        try {
            //iterate all values
            this.props.values.forEach(value => {
                
                //if match, save the value as float
                if( parseInt(value.scenarioId, 10) === parseInt(this.props.scenario.value, 10) 
                && parseInt(value.timePeriodId, 10) === parseInt(this.props.period.id, 10)
                && parseInt(value.indicatorId, 10) === parseInt(key, 10) ){
                    myValue = parseFloat(value.value);
                }
            });
        } catch (error) {
            
        }
        //return value
        return myValue;
    }

    /**
     * setValues
     * 
     * Sets found values to array to pass to the chart
     */
    setValues(){

        //helpers for temporary saving
        let stateLabels = [];
        let stateData = [];
        try {
            //value counter
            let counter = 0;

            //iterate indicators starting from category objects
            this.props.myIndicators.forEach(category => {

                //iterate indicator objects
                category.ind.forEach(indicator => {

                    //key for searching value 
                    let key = indicator.value;

                    let label = indicator.label;

                    //get value for key
                    let indData = this.getValue(key);

                    //save to arrays
                    stateLabels.push(label);
                    stateData.push({'x':counter++,'y':indData});
                });
            });
        } catch (error) {
            console.log(error.message)
        }

        //save to data member arrays
        this.labels = stateLabels;
        this.data = stateData;
       
    }

    render () {

        //import texts from lang-files
        const ln = require('../config/lang-'+this.props.lang).default.chart;

        //start by setting values
        this.setValues();
       
        //props
        const{period, region, scenario} = this.props;

        //if type not table
        if(this.props.chartType !== 'table'){

            //set chart type polar/column
            let type = this.props.chartType ==='polar';

            //char configuration
            const config = {

                chart: {
                    polar:type,
                    type:'column',
                },
                pane :{
                    size:'90%'
                },
            
                title: {
                    text: region.name + " " 
                        + period.yearStart + " - (" 
                        + period.yearEnd + ")"
                },
                credits :{
                    text: ln.metsamittari
                },
                yAxix: {
                    min: 0,
                
                    
                },
                xAxis: {
                categories:this.labels
                },

            plotOptions :{
                
                    series: {
                        shadow: false,
                        groupPadding:0,
                        pointPlacement: 'on',
                        color: '#0E7746'
                    }
            },
                
                series:[{
                    name: scenario.label,
                    data: this.data
                }],
            };
            
            return (<div className="chart_view" id="chartElement">
                    
                    {/*chart*/}
                    <ReactHighcharts config={ config }></ReactHighcharts>

                    {/*more info popup*/}
                    <InfoPopup 
                        myIndicatorsArray = {this.props.myIndicators}
                        scenario = {scenario.label}
                        indicatorCategories = {this.props.indicatorCategories}
                    />

                    {/*mela tupa link*/}
                    
                    <a href= { this.props.melaLink(scenario.value)
                    
                    } target="_blank">{ln.tarkat_tiedot}</a>
                    
    
                </div>) 
        } 
        
        // table view
        else {

            return (
                <div className="chart_view">
                    
                    <div className={scenario.value}>
                        <TableHtml 
                            scenarios = {this.props.myScenarios}
                            indicators = {this.props.myIndicators}
                            values = {this.props.values}
                            getValue = {this.getValue}
                            single = {scenario}
                            lang = {this.props.lang}
                        />
                    </div>
                    {/*more info popup*/}
                    <InfoPopup 
                        myIndicatorsArray = {this.props.myIndicators}
                        scenario = {scenario.label}
                        indicatorCategories = {this.props.indicatorCategories}
                    />

                    {/*mela tupa link*/}
                    
                    <a href= { this.props.melaLink(scenario.value)
                    
                    } target="_blank">{ln.tarkat_tiedot}</a>
                   
                </div>
                )

        }
    }
        
  
        
 
}

export default Chart
