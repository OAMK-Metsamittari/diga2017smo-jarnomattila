import React, { Component } from 'react'

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