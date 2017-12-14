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
           
            <Menu className="selectionMenu" isOpen={isCollapsed} >
                <div  id="toggeSelectionBtn" onClick={() => {this.props.toggleCollapse()}}><div>Indikaattorit</div></div>
                <div className="container-fluid" id="divSelections">

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
                    
                    
                </div>
            </Menu>
        )
    }
}
export default Selections
