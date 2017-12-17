import React, { Component } from 'react'
import Chart from './Chart';
import ChartMulti from './ChartMulti';
import FrontPage from './FrontPage';
import About from './About';
import './MainContent.css';
class MainContent extends Component {
    
    render () {

        
        const {myScenarios, chartView} = this.props;
      
        try {
            if(myScenarios.length > 0 && this.props.myIndicators.length > 0){

                switch(chartView){

                    case 'multi' :
                        return (
                            
                            <div className="main_content" id="chartElement">
                                <ChartMulti {...this.props}   />
                            </div>)


                    case 'single':
                        return (

                            <div className="main_content" id="chartElement">
                            
                            {
                              
                                // each scenario has an own chart
                                myScenarios.map(scenario => 
                                    <Chart  
                                    key = {scenario.value}
                                    scenario = {scenario} 
                                    {...this.props} 
    
    
                                    />
                                )
                            }
                            </div>
                        )


                    default:
                        switch(this.props.page){
                            case 'about' :
                                return (<div className="main_content">
                                    <About 
                                        lang = {this.props.lang}
                                    />
                                </div>);
                            default:
                                return (<div className="main_content">
                                <FrontPage 
                                    lang = {this.props.lang}
                                />
                                </div>);

                        }
                       
                }

    
            } else {
    
               
            }
        } catch (error) {
            
        }
        switch(this.props.page){
            case 'about' :
                return (<div className="main_content">
                    <About 
                        lang = {this.props.lang}
                    />
                </div>);
            default:
                return (<div className="main_content">
                <FrontPage 
                    lang = {this.props.lang}
                />
                </div>);

        }
        
    }
}

export default MainContent