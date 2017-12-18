import React, { Component } from 'react'

/**
 * About
 * Created:     2017-12-17 (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Contact info
 */

class About extends Component {
    render () {

        //import texts from lang-files
        const ln = require('../config/lang-'+this.props.lang).default.about;
        return (
            <div>
                <h3>{ln.title}</h3>
                <p>{ln.p1}</p>
                <p>{ln.p2} <a href='mailto:metsamittari@luke.fi'>metsamittari@luke.fi</a></p>
            </div>
        )
    }
}

export default About