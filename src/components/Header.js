import React, { Component } from 'react'
import './Header.css';
import Collapse from 'react-collapse'

/**
* Header
* Created:     2017-11-25 (Jarno Mattila)
* Modified:    2017-11-25 (Jarno Mattila)
* Description: 
*/

class Header extends Component {

    

    render () {
        return (
            <header className="clearfix navbar-fixed-top">
            <div className="row">
                <div className="col-sm-6 ">
                <h1>
                    Metsämittari
               </h1>
                </div>
                <div className="col-sm-6 ">
                    
                    <button 
                        className="btn btn-success" 
                        onClick={() => {this.props.toggleCollapse("types")}}>
                            Valinnat
                    </button>
                </div>
            </div>
            <Collapse isOpened={this.props.typesCollapse}>
                <div clasName="row clearfix" id="type_menu_collapse">
                        <div className="col-sm-12">                            
                            <div className="panel-body clearfix" >
                            <label htmlFor="type_buttons">Kaaviolaji:</label>
                                <div className="btn-group" id ="type_buttons">
                               
                                    <button 
                                        type="button" 
                                        className="btn btn-default" 
                                        onClick={() => {this.props.setChartType('polar')}}>
                                            Polar
                                        </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-default" 
                                        onClick={() => {this.props.setChartType('column')}}>
                                            Palkki
                                        </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-default" 
                                        onClick={() => {this.props.setChartType('table')}}>
                                            Taulukko
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Collapse>
            </header>
        )
    }
}

export default Header