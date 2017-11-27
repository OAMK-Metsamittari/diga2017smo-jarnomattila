import React, { Component } from 'react'
import './Period.css';

/**
 * Period
 * Created:     2017-11-25 (Jarno Mattila)
 * Modified:    2017-11-25 (Jarno Mattila)
 * Description: 
 */

class Period extends Component {
    render () {
        return (
            <div className="fixed-bottom">
                <label htmlFor="period">Ajankohta</label>
                <div id="period">

                </div>
            </div>
        )
    }
}

export default Period