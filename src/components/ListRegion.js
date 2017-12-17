import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/**
* ListRegion
* Created:     2017-11-25 (Jarno Mattila)
* Modified:    2017-11-27 (Jarno Mattila)
* Description: Regions select list
*/

class ListRegion extends Component {

    constructor(props)
    {
        super(props);
        this.setRegOptions = this.setRegOptions.bind(this);
        this.setRegion = this.setRegion.bind(this);
    }

    
    /**
     * setRegOptions
     * Sets Select options
     * @return Array opt
     */
    setRegOptions()
    {
        //get regions from props
        let regions = this.props.regions;

        // options array
        let opt = [];

        //map regions and fill opt array
        let optItems = regions.map(region => {

            //push needed fields to opt array
            opt.push( {value:region.id, label:region.name});
            return optItems;
        });
        return opt;
    }

    /**
     * setRegion
     * sets region from selected regions
     */
    setRegion = (selectedRegion) => {
        
        // calling setRegion with region id
        this.props.setRegion(selectedRegion);
        
    }


    render () {
        const ln = require('../config/lang-'+this.props.lang).default.menu_selections;
        
        return (
            <div className="select_container">
                <label htmlFor="regLevel">{ln.alue}</label>
                <Select 
                    value = {this.props.region ? this.props.region.id : "Any"}
                    onChange = {this.setRegion}
                    placeholder={ln.valitse}
                    id="regSelect"
                    name="regions"
                    options = {this.setRegOptions() }
                    selectedValue = {this.props.region ? this.props.region.id : null}
                />
            </div>
        )
    }
}

export default ListRegion