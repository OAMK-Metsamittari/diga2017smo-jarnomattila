import React, { Component } from 'react'
import WoodProduction from './WoodProduction';
import NaturalProducts from './NaturalProducts';
import Biodiversity from './Biodiversity';
import CarbonOthers from './CarbonOthers';

/**
 * MenuIndicators
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-11-25 (Jarno Mattila)
 * Description: 
 */

class MenuIndicators extends Component {
    render () {
        return (
            <div>
                 <div  className="row" >
                    <div className="col-sm-6">
                        <WoodProduction />
                        <NaturalProducts />
                    </div>
                    <div className="col-sm-6" id="divSceRight">
                        <Biodiversity />
                        <CarbonOthers />
                    </div>
                </div>
                
            </div>
        )
    }
}

export default MenuIndicators