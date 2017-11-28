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

    render () {
        return (
            <div>
                <label htmlFor="sceCollection">Skenaariokokoelma</label>
                <Select 
                    onChange = {this.setCollection}
                    placeholder="Valitse"
                    id="sceColSelect"
                    name="collections"
                    options = {this.setCollectionOptions() }
                 />
            </div>
        )
    }
}

export default SceCollection