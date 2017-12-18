import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CategoryPopup from './CategoryPopup'


/**
 * Scenarios
 * Created:     2017-12-02 (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Indicator selection menu
 */

class IndicatorCategory extends Component {

    constructor(props)
    {
        super(props);

        //local array for saving indicatos for this category only
        this.state = {indValues : []};
        
        this.setIndicator = this.setIndicator.bind(this);
        this.setIndOptions = this.setIndOptions.bind(this);
        
    }
   
    /**setIndicator
     * save a new indicator in App state
     */

    setIndicator = (option) => {

        //add new option as a indicator to state array
        try {
            let helpArray = [];
            this.state.indValues.forEach(element => {
                helpArray.push(element);
            });
            helpArray.push(option);
            this.setState({indValues:option});

            this.props.setIndicator(option, this.props.cat.id);
        } catch (error) {
            console.log("setIndicator error: " +error.message);
        }

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
    
    render () {
        //import texts from lang-files
        const ln = require('../config/lang-'+this.props.lang).default.menu_selections;  
        //props
        const {name, description} = this.props.cat;
       
        return (
            <div className="select_container">
                <label>
                    <CategoryPopup 
                        name = {name}
                        description = {description}
                    />
                    {name} 
                    
                </label>
                <Select
                    name="indicators"
                    placeholder={ln.valitse}
                    value = {this.state.indValues}
                    options={this.setIndOptions()}
                    onChange={this.setIndicator}
                    multi
                />
            </div>
        )
    }
}

export default IndicatorCategory