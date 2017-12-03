import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';


/**
 * Scenarios
 * Created:     2017-12-02 (Jarno Mattila)
 * Modified:    2017-12-03 (Jarno Mattila)
 * Description: 
 */

class IndicatorCategory extends Component {

   
    constructor(props)
    {
        super(props);

        //local array for saving indicatos for this category only
        this.indValues = [];
        
        this.setIndicator = this.setIndicator.bind(this);
        this.setIndOptions = this.setIndOptions.bind(this);
        this.setMyOptions = this.setMyOptions.bind(this);
        
    }

   
    /**
     * save a new indicator in App state
     */
    setIndicator = (option) => {
        //pass cat id as param too
        this.props.setIndicator(option, this.props.cat.id);
    }

     /**
     * setSceOptions
     * Sets Select options
     * @return Array opt
     */
    setIndOptions()
    {
        //get scenarios from props
        let indicators = this.props.cat.indicators;

        // options array
        let opt = [];

        //map scenarios and fill opt array
        let optItems = indicators.map(indicator => {

            //push needed fields to opt array
            opt.push( {value:indicator.id, label:indicator.name});
            return optItems;
        });
        return opt;
    }

    /**
     * setMyOptions()
     * Desc:    While creating multiple categories from this class
     *          it is necessary to indentify the category and get selected
     *          options for this category only
     */
    setMyOptions()
    {
        // read all indicators from props
        const indicatorValues = this.props.myIndicators.map(i => {

            //if indicator belongs to this category, return it
            if(i.cat === this.props.cat.id){
               return i.ind              
            }
        })
        
        // this is a workaround for handling undefined object issue
        for(let i in indicatorValues){
            
            // if object defined, save it as option value
            if(indicatorValues[i] !== undefined){
                this.indValues = indicatorValues[i];
            } 
        }
    }

    
    render () {
        const {name} = this.props.cat;
        
        // setting up option values
        this.setMyOptions();
                
        return (
            <div>
                <label >
                    {name}
                </label>
               
                <Select
                    name="indicators"
                    placeholder="Valitse"
                    value = {this.indValues}
                    options={this.setIndOptions()}
                    onChange={this.setIndicator}
                    multi
                />
            </div>
        )
    }
}

export default IndicatorCategory