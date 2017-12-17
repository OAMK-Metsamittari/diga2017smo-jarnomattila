import React, { Component } from 'react'
import MenuScenarios from './MenuScenarios';
import MenuIndicators from './MenuIndicators';
import {push as Menu} from 'react-burger-menu'
import './Selections.css';
/**
 * Selections
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-12-11 (Jarno Mattila)
 * Description: Selections panel
 */

class Selections extends Component {

    
   
    render () {
        const ln = require('../config/lang-'+this.props.lang).default.menu_selections;  
        const { isCollapsed, indicatorCategories, myIndicators,setIndicator, ...rest} = this.props;

        const verticalPosition = this.props.lang === 'en' ? {left:'-95px'} :{left:'-125px'};

        return (
           
            <Menu 
                className="selectionMenu" 
                isOpen={isCollapsed} 
                outerContainerId={"outer-container"} 
                pageWrapId={"page-wrap"}
                disableOverlayClick
                customBurgerIcon = {false}
                customCrossIcon = {false}
                noOverlay
            >
                <div  id="toggeSelectionBtn" onClick={() => {this.props.toggleCollapse()}}><div style={verticalPosition}>{ln.indikaattorit}</div></div>
                <div className="container-fluid" id="divSelections">

                    <div className="panel-header">
                        <h2>{ln.skenaariot}</h2>
                    </div>
                    <div className="panel-body">
                        <MenuScenarios {...rest} />
                    </div>
                   
                    <div className="panel-header">
                        <h2 >{ln.indikaattorit}</h2>
                    </div>
                        <div className="panel-body">
                            <MenuIndicators 
                                categories = {indicatorCategories}
                                myIndicators = {myIndicators}
                                setIndicator = {setIndicator}
                                myScenarios = {this.props.myScenarios}
                                lang = {this.props.lang}
                            />
                        </div>
                    
                    
                </div>
                
            </Menu>
        )
    }
}
export default Selections
