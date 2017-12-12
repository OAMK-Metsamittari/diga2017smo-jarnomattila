import React, { Component } from 'react'
import MenuScenarios from './MenuScenarios';
import MenuIndicators from './MenuIndicators';
import {slide as Menu} from 'react-burger-menu'
import './Selections.css';
/**
 * Selections
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-12-11 (Jarno Mattila)
 * Description: Selections panel
 */

class Selections extends Component {

    
   
    render () {
        
       const { isCollapsed, indicatorCategories, myIndicators,setIndicator, ...rest} = this.props;
        return (
           
            <Menu isOpen={isCollapsed} noOverlay>
                <div className="container-fluid" id="divSelections">

                    <button className="btn btn-danger" id="closeBtn" onClick={() => {this.props.toggleCollapse()}}>X</button>
              
                    <div className="panel-header">
                        <h2>Skenaariot</h2>
                    </div>
                    <div className="panel-body">
                        <MenuScenarios {...rest} />
                    </div>
                   
                    <div className="panel-header">
                        <h2 >Indikaattorit</h2>
                    </div>
                        <div className="panel-body">
                            <MenuIndicators 
                                categories = {indicatorCategories}
                                myIndicators = {myIndicators}
                                setIndicator = {setIndicator}
                                myScenarios = {this.props.myScenarios}
                            />
                        </div>
                    
                    <div className="panel-header">
                        <h2 >Kaaviolaji</h2>
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item"><button 
                            type="button" 
                            className="btn btn-default" 
                            onClick={() => {this.props.setChartType('polar')}}>
                                Polar
                            </button>
                        </li>
                        <li className="list-group-item"><button 
                            type="button" 
                            className="btn btn-default" 
                            onClick={() => {this.props.setChartType('column')}}>
                                Palkki
                            </button>
                        </li>
                        <li className="list-group-item">
                            <button 
                            type="button" 
                            className="btn btn-default" 
                            onClick={() => {this.props.setChartType('table')}}>
                                Taulukko</button>
                        </li>
                    </ul>
                </div>
            </Menu>
        )
    }
}
export default Selections
