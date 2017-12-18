import React, { Component } from 'react'
import './Header.css';
import MenuTop from './MenuTop';


/**
* Header
* Created:     2017-11-25 (Jarno Mattila)
* Modified:    2017-12-18 (Jarno Mattila)
* Description: 
*/

class Header extends Component {

    constructor(props){
        super(props);
        this.setPage = this.setPage.bind(this); //setting acrive page
    }

    /**
     * setPage
     * @param {*} page 
     * 
     * Sets the selecte page as active
     */
    setPage(page){
        this.props.setActivePage(page);
    }
    

    render () {
         //import texts from lang-files
        const ln = require('../config/lang-'+this.props.lang).default.header;

        
        return (
            <header className="clearfix navbar-fixed-top">
            <div className="row">
                <div className="col-sm-6 ">
                <h1>
                    {ln.metsamittari}
               </h1>
                </div>
                <div className="col-sm-5 main_menu">
                    
                    <button 
                        className="btn btn-success" 
                        id="selectMenu"
                        onClick={() => {this.props.toggleCollapse("types")}}>
                            {ln.valinnat}
                    </button>
                    
                    <div className="btn-group">
                        {
                            //read lagns from config and print buttons as group
                           this.props.ui.lang.map(lang =>{

                               const  buttonClass = this.props.lang === lang ?
                                    "btn btn-primary" :
                                    "btn btn-default";

                               return(
                                <button 
                                    key = {lang}
                                    id = {lang}
                                    type="button" 
                                    className={buttonClass}
                                    onClick={() => {this.props.setLang(lang)}}>
                                    {lang.toUpperCase()}
                                </button>
                               )
                                
                           })
                        }
                        
                        
                        
                    </div>

                </div>
                {/* About button*/}
                <div className="col-sm-1 ">
                     <a onClick={() =>{this.setPage('about')}}>{ln.tietoja}</a>
                </div>
            </div>

            {/*MenuTop includes chart type and chart view controls*/}
            <MenuTop 
                {...this.props}
            />
            </header>
        )
    }
}

export default Header