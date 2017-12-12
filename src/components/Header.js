import React, { Component } from 'react'
import './Header.css';

/**
* Header
* Created:     2017-11-25 (Jarno Mattila)
* Modified:    2017-11-25 (Jarno Mattila)
* Description: 
*/

class Header extends Component {

    

    render () {
        return (
            <header className="clearfix navbar-fixed-top">
            <div className="row">
                <div className="col-sm-6 ">
                <h1>
                    Metsämittari
               </h1>
                </div>
                <div className="col-sm-6 ">
                    
                    <button 
                        className="btn btn-success" 
                        onClick={() => {this.props.toggleCollapse()}}>
                            Valinnat
                    </button>
                </div>
            </div>
            </header>
        )
    }
}

export default Header