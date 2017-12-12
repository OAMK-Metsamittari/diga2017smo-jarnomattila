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
        this.state = {indValues : []};
        
        this.setIndicator = this.setIndicator.bind(this);
        this.setIndOptions = this.setIndOptions.bind(this);
        this.setMyOptions = this.setMyOptions.bind(this);
        
    }
   
    /**
     * save a new indicator in App state
     */
    setIndicator = (option) => {
        //pass cat id as param too
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

    /**
     * setMyOptions()
     * Desc:    While creating multiple categories from this class
     *          it is necessary to indentify the category and get selected
     *          options for this category only
     */
    setMyOptions()
    {
        // read all indicators from props
        this.props.myIndicators.forEach(i => {
            
            let indicator = null;
            //if indicator belongs to this category, return it
            if(i.cat === this.props.cat.id){
                console.log("ind:" + Object.values(i.ind));
                try {
                    i.ind.forEach(element => {
                        indicator =  i.ind    
                    });
                } catch (error) {
                    console.log("setMyOptions error: " +error.message);
                }
               
                          
            }
            return indicator;
        })
        
    }

    
    render () {

       /* try {
            console.log(this.props.myIndicators.length)
            this.props.myIndicators.forEach(element => {
               //console.log("hit:"+element);
                //console.log("myIndicators cat: " + element);
               // console.log("myIndicators ind: " + Object.keys(element.ind));
            });

            
        } catch (error) {
            console.log(error.message)
        }*/
          

        const {name} = this.props.cat;

                
        // setting up option values
       // this.setMyOptions();
                
        return (
            <div className="select_container">
                <label >
                    {name}
                </label>
               
                <Select
                    name="indicators"
                    placeholder="Valitse"
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