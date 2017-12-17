import React, { Component } from 'react'
import TableHtml from './TableHtml'
const ReactHighcharts = require('react-highcharts');
class ChartMulti extends Component {

    constructor(props){
        super(props);

        this.labels = [];
        this.series = [];

        this.getValue = this.getValue.bind(this);
        this.setValues = this.setValues.bind(this);

    }

    getValue(key, scenario){
        
        let myValue = 0;
        try {
            this.props.values.forEach(value => {
                if( parseInt(value.scenarioId, 10) === parseInt(scenario.value, 10) 
                && parseInt(value.timePeriodId, 10) === parseInt(this.props.period.id, 10)
                && parseInt(value.indicatorId, 10) === parseInt(key, 10) ){
                    myValue = parseFloat(value.value);
                }
            });
        } catch (error) {
            
        }
        
        return myValue;
    }

    setValues(){
        let stateLabels = [];
        
        let stateSeries = [];
        try {

            this.props.myScenarios.forEach(scenario => {
                let stateData = [];
                this.props.myIndicators.forEach(category => {
                   
                    category.ind.forEach(indicator => {
                        let key = indicator.value;
                        let label = indicator.label;
                    let indData = this.getValue(key, scenario);
                        stateLabels.push(label);
                        stateData.push(indData);
                    });
                });
                stateSeries.push({
                    type: 'column',
                    name: scenario.label,
                    data: stateData
                });
            });
        } catch (error) {
            console.log(error.message)
        }

        this.labels = stateLabels;
        this.series = stateSeries;
       
    }


    render () {
        this.setValues();
        

        const isPolar = this.props.chartType === 'polar' ? true : false;
        //props
        const{period, region} = this.props;

       if(this.props.chartType !== 'table'){
       
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

           };
           
           return (<div >
                <a href= { this.props.melaLink()
                   
                } target="_blank">Tarkat tiedot</a>

                  {<ReactHighcharts config={ config }></ReactHighcharts>}
               </div>) 
         } else {
            
            return (
                <div>
                    <a href= { this.props.melaLink()
                        
                    } target="_blank">Tarkat tiedot</a>
                    <TableHtml 
                        scenarios = {this.props.myScenarios}
                        indicators = {this.props.myIndicators}
                        values = {this.props.values}
                        getValue = {this.getValue}
                    />
                </div>
                )
         }
    }   
 
}

export default ChartMulti
