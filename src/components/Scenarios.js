import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

/**
 * Scenarios
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-12-02 (Jarno Mattila)
 * Description: 
 */

class Scenarios extends Component {

    constructor(props)
    {
        super(props);
        
        this.setScenario = this.setScenario.bind(this);
        this.setSceOptions = this.setSceOptions.bind(this);
        
    }
    
   
    setScenario = (option) => {
        this.props.setScenario(option);
      }

     /**
     * setSceOptions
     * Sets Select options
     * @return Array opt
     */
    setSceOptions()
    {
        //get scenarios from props
        let scenarios = this.props.scenarios;

        // options array
        let opt = [];

        //map scenarios and fill opt array
        let optItems = scenarios.map(scenario => {

            //push needed fields to opt array
            opt.push( {value:scenario.id, label:scenario.name});
            return optItems;
        });
        return opt;
    }

    

   
    render() {
        return (
          <div className="select_container">
            <label>Skenaariot</label>
            <Select
              name="filters"
              placeholder="Valitse"
              value={this.props.myScenarios}
              options={this.setSceOptions()}
              onChange={this.setScenario}
              multi
            />
          </div>
        );
      }
}

export default Scenarios