import React, { Component } from 'react'
import ListRegLevel from './ListRegLevel';
import ListRegion from './ListRegion';
import SceCollection from './SceCollection';
import Scenarios from './Scenarios';
import Period from './Period';


/**
 * MenuScenarios
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-12-03 (Jarno Mattila)
 * Description: 
 */

class MenuScenarios extends Component {
    render () {
        
        return (
            <div className="container-fluid">
                
                        <ListRegLevel 
                            regionLevels = {this.props.regionLevels}
                            regionLevel = {this.props.regionLevel}
                            getRegions = {this.props.getRegions}
                         />
                        <ListRegion 
                            regions = {this.props.regions}
                            region = {this.props.region}
                            setRegion = {this.props.setRegion}
                         />
                        <SceCollection 
                            getSceCollections = {this.props.getSceCollections}
                            setSceCollection = {this.props.setSceCollection}
                            scenarioCollection = {this.props.scenarioCollection}
                        />
                        <Scenarios 
                            scenarios = {this.props.scenarios}
                            setScenario = {this.props.setScenario }   
                            myScenarios = {this.props.myScenarios}                  
                        />
                        <Period 
                            timePeriods = {this.props.timePeriods}
                            setPeriod = {this.props.setPeriod}
                            period = {this.props.period}
                        />
               
                
            </div>
        )
    }
}

export default MenuScenarios
