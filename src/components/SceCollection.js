import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';


/**
 * SceCollection
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-11-27 (Jarno Mattila)
 * Description: Scenarion Collections Select list
 */

class SceCollection extends Component {

    constructor(props)
    {
        super(props);
        this.setCollectionOptions = this.setCollectionOptions.bind(this);
        this.setCollection = this.setCollection.bind(this);
    }

    /**
     * setCollectionOptions
     * Sets Select options
     * @return Array opt
     */
    setCollectionOptions()
    {
        ///get collections from props
        let sceCollections = this.props.getSceCollections();

        // options array
        let opt = [];

        for(let i in sceCollections){
            opt.push({value: sceCollections[i].id, label:sceCollections[i].description} );
        }

        return opt;
    }

    /**
     * setCollection
     * sets scenarion collections from selected region
     */
    setCollection = (selectedCollection) => {
        
        // calling setRegion with region id
        this.props.setSceCollection(selectedCollection.value);
        
        
    }

    render () {
        return (
            <div>
                <label htmlFor="sceCollection">Skenaariokokoelma</label>
                <Select 
                     value = {this.props.scenarioCollection.id ? this.props.scenarioCollection.id : "Any"}  
                    onChange = {this.setCollection}
                    placeholder="Valitse"
                    id="sceColSelect"
                    name="collections"
                    options = {this.setCollectionOptions() }
                    selectedValue = {this.props.scenarioCollection.id}
                 />
            </div>
        )
    }
}

export default SceCollection