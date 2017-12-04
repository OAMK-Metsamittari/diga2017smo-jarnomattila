import React, { Component } from 'react'
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
class ChartMulti extends Component {

    render () {

        //props
        const{period, region, myScenarios, myIndicators, values} = this.props;

        //helper array (not working)
        let foundNames = [];

        //map all scenarios
       const allScenarios = myScenarios.map(scenario => {

            //get indicator keys (ids) 
            const indKeys = myIndicators.map(objectIndCategory => {
                
                return objectIndCategory.ind.map(objectInd => {
                    return objectInd.value;
                })
            });

            //get indicator values
            const indData = indKeys.map(key => {
                for(let i in values){
                    if( parseInt(values[i].scenarioId, 10) === parseInt(scenario.value, 10) 
                        && parseInt(values[i].timePeriodId, 10) === parseInt(period.id, 10)
                        && parseInt(values[i].indicatorId, 10) === parseInt(key, 10) ){
                            return values[i].value;
                        }
                }
            })

            
            //get indicator names (not working)
            const indNames = myIndicators.map(objectIndCategory => {
                
                return objectIndCategory.ind.map(objectInd => {

                    //if not in helper array, get name
                    if(foundNames.indexOf(objectInd.label) === -1){
                        foundNames.push(objectInd.label);
                        return objectInd.label;
                    }
                    
                })
            });

            //return config array for series, data and xAxix labels
            return [scenario.label, indData, indNames];

        })
        
        //create arrays for multi serie plots
        const mySeries = allScenarios.map(item => {
            
            return {
                type: 'column',
                name: item[0],
                data: item[1]
            }
        })

        //indicator names (not work)
        const indNames = allScenarios.map(item => {
            return item[2];
        })
        
       
        const config = {
            
            chart: {
                polar:true
            },
            title: {
                text: region.name + " " 
                    + period.yearStart + " - (" 
                    + period.yearEnd + ")"
            },
            
            xAxis: {
                categories: indNames
            },
            series:mySeries
        };
        
        return (<div >
               {<ReactHighcharts config={ config }></ReactHighcharts>}
            </div>) 
    }   
 
}

export default ChartMulti