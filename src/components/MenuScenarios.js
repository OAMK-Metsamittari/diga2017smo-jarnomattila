import React, { Component } from 'react'
import ListRegLevel from './ListRegLevel';
import ListRegion from './ListRegion';
import SceCollection from './SceCollection';
import Scenarios from './Scenarios';
import Period from './Period';
import './MenuScenarios.css';

/**
 * MenuScenarios
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-11-27 (Jarno Mattila)
 * Description: 
 */

class MenuScenarios extends Component {
    render () {
        
        return (
            <div>
                <div  className="row" >
                    <div className="col-sm-6">
                        <ListRegLevel 
                            regionLevels = {this.props.regionLevels}
                            regionLevel = {this.props.regionLevel}
                            getRegions = {this.props.getRegions}
                         />
                        <ListRegion 
                            regions = {this.props.regions}
                            setRegion = {this.props.setRegion}
                         />
                        <SceCollection 
                            getSceCollections = {this.props.getSceCollections}
                        />
                    </div>
                    <div className="col-sm-6" id="divSceRight">
                        <Scenarios />
                    </div>
                </div>
                <div className="row">
                    <div><Period /></div>
                </div>
            </div>
        )
    }
}

export default MenuScenarios