import React, { Component } from 'react'
import Skylight from 'react-skylight'
import Parser from 'react-html-parser'

/**
 * CategoryPopup
 * Created:     2017-12-18 (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Popup descriptions for Indicator Categories
 */

class CategoryPopup extends Component {

    constructor(props){
        super(props);

        //positioning and styles fo popup
        //see MainContent.css too
        this.dialogStyle = {
           backgroundColor : "rgba(26, 75, 26,0.8)",
           textAlign:"left",
           color:'#ffffff',
           position:'absolute',
           left:'-30px',
           height:'15em',
           width:'20em',
        }
        
    }


    render () {
        const {name, description} = this.props;
        return (
                <section className="category_popup">
                    <a className="glyphicon glyphicon-question-sign" onClick={() => this.simpleDialog.show()}></a>
                    <Skylight dialogStyles={this.dialogStyle} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={name}>
                    <div >
                      {Parser(description)}
                    </div>
                    </Skylight>
                </section>
         
        )
    }
}

export default CategoryPopup