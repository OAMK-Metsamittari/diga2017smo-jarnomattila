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
        const {lang} = this.props;
        return (
            <div className="container-fluid">
                
                        <ListRegLevel 
                            regionLevels = {this.props.regionLevels}
                            regionLevel = {this.props.regionLevel}
                            getRegions = {this.props.getRegions}
                            lang = {lang}
                         />
                        <ListRegion 
                            regions = {this.props.regions}
                            region = {this.props.region}
                            setRegion = {this.props.setRegion}
                            lang = {lang}
                         />
                        <SceCollection 
                            getSceCollections = {this.props.getSceCollections}
                            setSceCollection = {this.props.setSceCollection}
                            scenarioCollection = {this.props.scenarioCollection}
                            lang = {lang}
                        />
                        <Scenarios 
                            scenarios = {this.props.scenarios}
                            setScenario = {this.props.setScenario }   
                            myScenarios = {this.props.myScenarios} 
                            lang = {lang}                 
                        />
                        <Period 
                            timePeriods = {this.props.timePeriods}
                            setPeriod = {this.props.setPeriod}
                            period = {this.props.period}
                            lang = {lang}
                        />
               
                
            </div>
        )
    }
}

export default MenuScenarios
