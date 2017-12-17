import React, { Component } from 'react'

class About extends Component {
    render () {
        const ln = require('../config/lang-'+this.props.lang).default.about;
        
        return (
            <div>
                <h3>{ln.title}</h3>
                <p>{ln.p1}</p>
                <p>{ln.p2} <a href='mailto:t5maja03@students.oamk.fi'>t5maja03@students.oamk.fi</a></p>
            </div>
        )
    }
}

export default About