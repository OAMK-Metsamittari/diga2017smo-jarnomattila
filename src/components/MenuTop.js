import React, { Component } from 'react'
import Collapse from 'react-collapse'

/**
* MenuTop
* Created:     2017-11-25 (Jarno Mattila)
* Modified:    2017-11-27 (Jarno Mattila)
* chart type and chart view selection panel
*/

class MenuTop extends Component {

    constructor(props){
        super(props);

        this.buttonType = this.buttonType.bind(this);
    }

    /**
     * buttonType
     * @param {*} button 
     * 
     * Controlling cative buttons. 
     * (This is a bit clumsy way, but works)
     */
    buttonType(button){

        switch(button){

            case "typePolar":

                return (
                    this.props.chartType === 'polar' ? 
                        "btn btn-primary" : 
                        "btn btn-default"
                )
                    

            case "typeColumn":
            
                return (
                    this.props.chartType === 'column' ? 
                        "btn btn-primary" : 
                        "btn btn-default"
                )


            case "typeTable":
                
                return (
                    this.props.chartType === 'table' ? 
                        "btn btn-primary" : 
                        "btn btn-default"
                )
            

            case "viewSingle":

                return (
                    this.props.chartView === 'single' ? 
                        "btn btn-primary" : 
                        "btn btn-default"
                )
            

            case "viewMulti":
                
                return (
                    this.props.chartView === 'multi' ? 
                        "btn btn-primary" : 
                        "btn btn-default"
                )

            default:
                return "btn btn-default"
        }
    }

    render () {
        const ln = require('../config/lang-'+this.props.lang).default.menu_top;
        return (
            <Collapse isOpened={this.props.typesCollapse} >
                <div className="row clearfix" id="type_menu_collapse">
                        <div className="col-sm-6">                            
                            <div className="panel-body clearfix" >
                            <label htmlFor="type_buttons">{ln.kaaviolaji}:</label>
                                <div className="btn-group" id ="type_buttons">
                               
                                    <button 
                                        id = "typePolar"
                                        type="button" 
                                        className={this.buttonType("typePolar")}   
                                        onClick={() => {this.props.setChartType('polar')}}>
                                            {ln.polar}
                                     </button>
                                    <button 
                                        id = "typeColumn"
                                        type="button" 
                                        className={this.buttonType("typeColumn")}
                                        onClick={() => {this.props.setChartType('column')}}>
                                            {ln.palkki}
                                    </button>
                                    
                                    <button 
                                        id = "typeTable"
                                        type="button" 
                                        className={this.buttonType("typeTable")}
                                        onClick={() => {this.props.setChartType('table')}}>
                                            {ln.taulukko}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">                            
                            <div className="panel-body clearfix" >
                            <label htmlFor="type_buttons">{ln.kaavionakyma}:</label>
                                <div className="btn-group" id ="type_buttons">
                               
                                    
                                    <button 
                                        id = "viewSingle"
                                        type="button" 
                                        className={this.buttonType("viewSingle")}
                                        onClick={() => {this.props.setChartView('single')}}>
                                            {ln.eritelty}
                                    </button>
                                    <button 
                                        id = "viewMulti"
                                        type="button" 
                                        className={this.buttonType("viewMulti")}
                                        onClick={() => {this.props.setChartView('multi')}}>
                                            {ln.yhdistelma}
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
            </Collapse>
        )
    }
}

export default MenuTop