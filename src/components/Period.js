import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/**
 * Period
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-12-03 (Jarno Mattila)
 * Description: 
 */

class Period extends Component {

    constructor(props)
    {
        super(props);
        
        this.setPeriod = this.setPeriod.bind(this);
        this.setPeriodOptions = this.setPeriodOptions.bind(this);
        
    }

    /**
     * setPeriodOptions
     * Sets Select options
     * @return Array opt
     */
    setPeriodOptions()
    {
        //get regions from props
        let periods = this.props.timePeriods;

        // options array
        let opt = [];

        //map regions and fill opt array
        let optItems = periods.map(period => {

            //push needed fields to opt array
            opt.push( {
                value:period.id, 
                label:period.yearStart + " - (" + period.yearEnd + ")"
            });
            return optItems;
        });
        return opt;
    }

    /**
     * setPeriod
     * sets period from selected regions
     */
    setPeriod = (selectedPeriod) => {
        
        // calling setRegion with region id
        if(selectedPeriod.value){
            this.props.setPeriod(selectedPeriod.value);
        }
       
        

    }

    render () {
        const ln = require('../config/lang-'+this.props.lang).default.menu_selections;
        
        return (
            <div className="fixed-bottom">
                <label htmlFor="period">{ln.ajankohta}</label>
                <Select 
                value = {this.props.period.id >= 0 ? this.props.period.id : "Any"}
                onChange = {this.setPeriod}
                placeholder={ln.valitse}
                id="period"
                name="periods"
                options = {this.setPeriodOptions() }
                selectedValue = {this.props.period.id}
                />
            </div>
        )
    }
}

export default Period