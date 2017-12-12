import React, { Component } from 'react'
import Chart from './Chart';
import ChartMulti from './ChartMulti';
import FrontPage from './FrontPage';
import './MainContent.css';
class MainContent extends Component {

    constructor(props){
        super(props);

        this.randColor = this.randColor.bind(this);
    }


    randColor(){
        const colors = [
            'olivedrab', 
            'darkolivegreen',
            'olive',
            'yellowgreen',
            'forestgreen',
            'limegreen'
        ];
        return colors[Math.floor(Math.random()*colors.length)];

    }
    render () {

        const {myScenarios, ...rest} = this.props
        try {
            if(myScenarios.length > 0 && this.props.myIndicators.length > 0){
                return (
                    <div className="main_content" >
                        
                        {
                           
                            // each scenario has an own chart
                            myScenarios.map(scenario => 
                                <Chart  
                                key = {scenario.value}
                                scenario = {scenario} 
                                color = {this.randColor()}
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
    
            } else {
    
                return (<div className="main_content"><FrontPage /></div>);
            }
        } catch (error) {
            return (<div className="main_content "  ></div>)
        }
       
        
        
    }
}

export default MainContent