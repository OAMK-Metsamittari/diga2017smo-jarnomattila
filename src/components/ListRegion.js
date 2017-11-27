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
     * sets region collections from selected regionselecte region in state
     */
    setRegion = (selectedRegion) => {
        
        console.log("getSceCollections:"+selectedRegion.value );
        // calling setRegion with retion id
        this.props.setRegion(selectedRegion.value);
        
    }


    render () {
        return (
            <div>
                <label htmlFor="regLevel">Alue</label>
                <Select 
                    onChange = {this.setRegion}
                    placeholder="Valitse"
                    id="regSelect"
                    name="regions"
                    options = {this.setRegOptions() }
                />
            </div>
        )
    }
}

export default ListRegion