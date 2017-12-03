import React, { Component } from 'react'
import './SelectedItems.css';

/**
 * SelectedItems
 * Created:     2017-11-27 (Jarno Mattila)
 * Modified:    2017-12-02 (Jarno Mattila)
 * Description: Selected items panel
 */

class SelectedItems extends Component {

    constructor(props){
        super(props);
        this.listMyScenarios = this.listMyScenarios.bind(this);
    }
    
    listMyScenarios(){
        let string = "";
        for(let i in this.props.myScenarios){
            string = string + this.props.myScenarios[i].label + " ";
        }
        return string;
    }
    render () {
        
        

        return (
            <div id="selecteItems">
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Aluetaso
                    </div>
                    <div className="panel-body">
                        {this.props.regionLevel.name}
                    </div>
                </div>
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Alue
                    </div>
                    <div className="panel-body">
                        {this.props.region.name}
                    </div>
                </div>
                <div className="col-sm-2 panel panel-default">
                    <div className="panel-heading">
                        Skenaariokokoelma
                    </div>
                    <div className="panel-body">
                        {this.props.scenarioCollection.description}
                    </div>
                </div>
                <div className="col-sm-2 panel panel-default">
                    <div className="panel-heading">
                        Skenaariot
                    </div>
                    <div className="panel-body">
                        {this.listMyScenarios()}
                    </div>
                </div>
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Ajankohta
                    </div>
                    <div className="panel-body">
                        {this.props.period.yearStart + " - (" + this.props.period.yearEnd + ")"}
                    </div>
                </div>
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Puuntuotanto
                    </div>
                </div>
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Keruutuotteet
                    </div>
                </div>
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Monimuotoisuus
                    </div>
                </div>
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Hiili
                    </div>
                </div>
                <div className="col-sm-1 panel panel-default">
                    <div className="panel-heading">
                        Muut
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectedItems