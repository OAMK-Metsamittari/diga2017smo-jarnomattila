import React, { Component } from 'react'
import Chart from './Chart';
import ChartMulti from './ChartMulti';
class MainContent extends Component {
    render () {

        const {myScenarios, ...rest} = this.props
        

        return (
            <div className="chart_container">
                
               {
                   // each scenario has an own chart
                   myScenarios.map(scenario =>
                    
                     <Chart  
                        key = {scenario.value}
                        scenario = {scenario} 
                        {...rest} 
                     />
                   )
                }
               {
                   //multi scenario chart
                   <ChartMulti {...this.props}   />
               }
            </div>
        )
    }
}

export default MainContent