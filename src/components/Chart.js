import React, { Component } from 'react'
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
class Chart extends Component {

    render () {

       
        //props
        const{period, region, scenario, myIndicators, values} = this.props;

        //map indicators to get indicator keys (ids)
        const indKeys = myIndicators.map(objectIndCategory => {
            
            return objectIndCategory.ind.map(objectInd => {
                return objectInd.value;
            })
        });
        
        //map indicator keys to get indicator values
        const indData = indKeys.map(key => {

            //loop values and check if match
            for(let i in values){
                if( parseInt(values[i].scenarioId, 10) === parseInt(scenario.value, 10) 
                    && parseInt(values[i].timePeriodId, 10) === parseInt(period.id, 10)
                    && parseInt(values[i].indicatorId, 10) === parseInt(key, 10) ){
                        return values[i].value;
                    }
            }
        })

        //helper array 
        let foundNames = [];

        //map indocators to get indicator names (not work)
        const indNames = myIndicators.map(objectIndCategory => {
            
            return objectIndCategory.ind.map(objectInd => {
                
                // in not in helper array, its a new one
                if(foundNames.indexOf(objectInd.label) === -1){
                    foundNames.push(objectInd.label);
                    return objectInd.label;
                }
                   
            })
        });

        const config = {
            
            chart: {
                polar:true,
                type: 'column'
            },
            title: {
                text: region.name + " " 
                    + period.yearStart + " - (" 
                    + period.yearEnd + ")"
            },
            subtitle: {
                 text: scenario.label
            },
            xAxis: {
            categories: indNames
            },
            series:[{
                data: indData
            }]
        };
        
        return (<div >
                <ReactHighcharts config={ config }></ReactHighcharts>
            </div>) 
    }
        
  
        
 
}

export default Chart