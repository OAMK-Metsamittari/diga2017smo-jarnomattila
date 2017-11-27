import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/**
 * ListRegLevel
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-11-26 (Jarno Mattila)
 * Description: Region levels list and event handlers 
 */

class ListRegLevel extends Component {

    constructor(props)
    {
        super(props);
        this.setRegLevelOptions = this.setRegLevelOptions.bind(this);
        this.getRegions = this.getRegions.bind(this);
    }

    /**
     * setRegLevelOptions
     * Sets Select options
     * @return Array opt
     */
    setRegLevelOptions()
    {
        //get regionlevels from props
        let regionLevels = this.props.regionLevels;

        // options array
        let opt = [];

        //map regionlevels and fill opt array
        let optItems = regionLevels.map(level => {

            //grab needed fields to opt array
            opt.push( {value:level.id, label:level.name});
            return optItems;
        });
        return opt;
    }

    /**
     * getRegions
     * Gets regions from selected level
     */
    getRegions = (selectedRegLevel) => {
        
        // calling getRegions with level id
        this.props.getRegions(selectedRegLevel.value);
    }
    
    /**
     * render UI
     */
    render () {

        return (
            <div>
                <label htmlFor="regLevelSelect">Aluetaso</label>
                <Select 
                    value = {this.props.regionLevel ? this.props.regionLevel.id : "Any"}
                    onChange = {this.getRegions}
                    placeholder="Valitse"
                    id="regLevelSelect"
                    name="regionLevels"
                    options = {this.setRegLevelOptions() }
                    selectedValue = {this.props.regionLevel.id}
               />
            </div>
        )
    }
}

export default ListRegLevel