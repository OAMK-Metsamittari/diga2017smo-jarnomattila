import React, { Component } from 'react'
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
class Chart extends Component {

    constructor(props){
        super(props);

        this.labels = [];
        this.data = [];
        this.chartType = 'polar';

        this.getValue = this.getValue.bind(this);
        this.setValues = this.setValues.bind(this);

    }

    getValue(key){
        let myValue = 0;
        try {
            this.props.values.forEach(value => {
                
                if( parseInt(value.scenarioId, 10) === parseInt(this.props.scenario.value, 10) 
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
        let stateData = [];
        try {
            let counter = 0;
            this.props.myIndicators.forEach(category => {
                category.ind.forEach(indicator => {
                    let key = indicator.value;
                    let label = indicator.label;
                   let indData = this.getValue(key);
                    stateLabels.push(label);
                    stateData.push({'x':counter++,'y':indData});
                });
            });
        } catch (error) {
            console.log(error.message)
        }
        this.labels = stateLabels;
        this.data = stateData;
       
    }

    render () {
        this.setValues();
       
        //props
        const{period, region, scenario} = this.props;

        //this.indicatorKeys();

        let type = this.props.chartType ==='polar';

       

       
        const config = {
            
            chart: {
                polar:type,
                type:'column'
            },
            pane :{
                size:'90%'
            },
           
            title: {
                text: region.name + " " 
                    + period.yearStart + " - (" 
                    + period.yearEnd + ")"
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
            legend: {
                
                verticalAlign: 'top',
                y:20
            },
            series:[{
                name: scenario.label,
                data: this.data
            }],
        };
        
        return (<div >
                <ReactHighcharts config={ config }></ReactHighcharts>
            </div>) 
    }
        
  
        
 
}

export default Chart
