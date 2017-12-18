import React, { Component } from 'react'
import TableHtml from './TableHtml'
import InfoPopup from './InfoPopup'
const ReactHighcharts = require('react-highcharts');

/**
 * ChartMulti
 * Created:     2017-12-xx (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Multi Scenario chart
 */

class ChartMulti extends Component {

    constructor(props){
        super(props);

        //chart labels and values
        this.labels = [];
        this.series = [];

        this.getValue = this.getValue.bind(this);       //get this values from all values
        this.setValues = this.setValues.bind(this);     //save this value to array

    }

    /**
     * getValue
     * @param {*} key 
     * 
     * Reads all values and pics values for this chart only
     */
    getValue(key, scenario){
        
        let myValue = 0;
        try {
             //iterate all values
            this.props.values.forEach(value => {

                //if match, save the value as float
                if( parseInt(value.scenarioId, 10) === parseInt(scenario.value, 10) 
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
        let stateSeries = [];
        try {
            //iterate all selected scenarios
            this.props.myScenarios.forEach(scenario => {

                //helper array for temp savin data
                let stateData = [];

                //iterate indicators starting from categories
                this.props.myIndicators.forEach(category => {
                   
                    //iterate indicators and save values to temp array
                    category.ind.forEach(indicator => {
                        let key = indicator.value;
                        let label = indicator.label;
                    let indData = this.getValue(key, scenario);
                        stateLabels.push(label);
                        stateData.push(indData);
                    });
                });

                //create series for each scenario
                stateSeries.push({
                    type: 'column',
                    name: scenario.label,
                    data: stateData
                });
            });
        } catch (error) {
            console.log(error.message)
        }

        //save labels and series to member arrays
        this.labels = stateLabels;
        this.series = stateSeries;
       
    }


    render () {

        //import texts from lang-files
        const ln = require('../config/lang-'+this.props.lang).default.chart;
        
        //start by setting values
        this.setValues();
        

        //set chart type polar boolean
        const isPolar = this.props.chartType === 'polar' ? true : false;

        //props
        const{period, region} = this.props;

        // if type not table
       if(this.props.chartType !== 'table'){
       
            //chart configuration
           const config = {
               
               chart: {
                   polar:isPolar,
                   type:this.props.chartType
               },
               title: {
                   text: region.name + " " 
                       + period.yearStart + " - (" 
                       + period.yearEnd + ")"
               },

               plotOptions: {
                   series: {
                       groupPadding : 0.1
                   }
               },
               
               xAxis: {
                   categories:this.labels,
                   gridLineColor: '#000000'
               },
               yAxis: {
                   min: 0,
                   
               },
               series:this.series,
                credits :{
                    text: ln.metsamittari
                },

           };
           
           return (<div className="chart_view">
                
                {/*chart*/}
                {<ReactHighcharts config={ config }></ReactHighcharts>}

                 {/*more info popup*/}
                <InfoPopup 
                    myIndicatorsArray = {this.props.myIndicators}
                    scenario = " "
                    indicatorCategories = {this.props.indicatorCategories}
                />

                 {/*mela tupa link*/}
                <a href= { this.props.melaLink()
                   
                } target="_blank">{ln.tarkat_tiedot}</a>
               </div>) 
         } else {
            
             // table view
            return (
                <div className="chart_view">
                    
                    <TableHtml 
                        scenarios = {this.props.myScenarios}
                        indicators = {this.props.myIndicators}
                        values = {this.props.values}
                        getValue = {this.getValue}
                        lang = {this.props.lang}
                    />
                     {/*more info popup*/}
                     <InfoPopup 
                        myIndicatorsArray = {this.props.myIndicators}
                        indicatorCategories = {this.props.indicatorCategories}
                    />

                    {/*mela tupa link*/}
                    
                    <a href= { this.props.melaLink()
                    
                    } target="_blank">{ln.tarkat_tiedot}</a>
                </div>
                )
         }
    }   
 
}

export default ChartMulti
