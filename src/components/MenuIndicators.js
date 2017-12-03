import React, { Component } from 'react'
import IndicatorCategory from './IndicatorCategory';

/**
 * MenuIndicators
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-12-03 (Jarno Mattila)
 * Description: 
 */

class MenuIndicators extends Component {

    render () {

        return (
            <div>
                {
                   this.props.categories.map(category => 

                                <IndicatorCategory 
                                    key = {category.id}
                                    cat = {category} 
                                    myIndicators = {this.props.myIndicators}
                                    setIndicator = {this.props.setIndicator}
                                />
                               
                            )
                }
            </div>
        )
    }
}

export default MenuIndicators