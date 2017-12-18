import React, { Component } from 'react'
import Chart from './Chart';
import ChartMulti from './ChartMulti';
import FrontPage from './FrontPage';
import About from './About';
import './MainContent.css';

/**
 * MainContent
 * Created:     2017-12-xx (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Wrapper for everythis that is displayed in main view
 */

class MainContent extends Component {
    
    render () {

        const {myScenarios, chartView} = this.props;
      
        try {

            //indicator charts and tables
            if(myScenarios.length > 0 && this.props.myIndicators.length > 0){

                // select view by selection
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
                        
                        //statig pages
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
        //default view
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