import React, { Component } from 'react'
import MenuScenarios from './MenuScenarios';
import MenuIndicators from './MenuIndicators';
import SelectedItems from './SelectedItems';
import scrollToComponent from 'react-scroll-to-component';
import './Selections.css';

/**
 * Selections
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-11-26 (Jarno Mattila)
 * Description: Selections panel
 */

class Selections extends Component {

    constructor(props)
    {
        super(props);
        this.state = 
        {
            toggle:'down'
        }
    }
    
    toggleMenuVisibility(status)
    {
        let target = this.state.toggle === 'up' ? this.menuContainer : this.selectionContainer;
        scrollToComponent(target, {
            offset:0,
            align: 'top',
            duration: 1500
        });
        if(this.state.toggle === 'up'){
            this.setState({toggle:'down'});
        } 
        else {
            this.setState({toggle:'up'});
        }
        

    }

    render () {
        
       
        return (
            <div style={{position:'relative'}} ref={(div) => {this.menuContainer = div;}}>
                <button type="button" className="close" id="menuToggle" onClick={() => this.toggleMenuVisibility(1)} >
                    <span className="glyphicon glyphicon-arrow-up"></span>
                </button>
                <div  className="row noMargins noPaddings" id="selectionsMenu">
                    <div className="col-sm-6 panel panel-default">
                        <div className="panel-headeing">
                            Skenaarioiden valinta
                        </div>
                        <div className="panel-body">
                            <MenuScenarios {...this.props} />
                        </div>
                    </div>
                    <div className="col-sm-6 panel panel-default">
                        <div className="panel-headeing">
                            Indikaattorien valinta
                        </div>
                        <div className="panel-body">
                            <MenuIndicators />
                        </div>
                    </div>
                </div>
                <div className="panel panel-default noMargins" ref={(div) => {this.selectionContainer = div;}} >
                    <SelectedItems 
                        regionLevel = {this.props.regionLevel}
                        region = {this.props.region}
                    />
                </div>

            </div>
        )
    }
}
export default Selections