import React, { Component } from 'react'

/**
 * FrontPage
 * Created:     2017-12-17 (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Main front page
 */

class FrontPage extends Component {
    render () {
        const ln = require('../config/lang-'+this.props.lang).default.frontpage;
        
        return (
            <div>
                <h3>{ln.title}</h3>
                <p>
                    {ln.p1}
                </p>
            </div>
        )
    }
}

export default FrontPage