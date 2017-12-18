import React, { Component } from 'react'
import Skylight from 'react-skylight'
import Parser from 'react-html-parser'

/**
 * InfoPopup
 * Created:     2017-12-17 (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Popup descriptions for Indicator descriptions
 */

class InfoPopup extends Component {

    constructor(props){
        super(props);

        //positioning and styles fo popup
        //see MainContent.css too
        this.dialogStyle = {
           backgroundColor : "rgba(26, 75, 26,0.8)",
           color: "rgb(255,255,255)",
           textAlign:"left",
           position:'absolute',
           bottom:'0px',
           height:'30em',
           width:'30em',
        }
        
    }

    render () {

        // build a text for popup
        let text = "";
        try {
            this.props.myIndicatorsArray.forEach(indArray => {
                indArray.ind.forEach(myind =>{
                    
                    this.props.indicatorCategories.forEach(cat => {
                        cat.indicators.forEach(ind => {
                            if(ind.id === myind.value){
                                text =  text.concat(
                                    "<h4>" + ind.name + "</h4><p>" + ind.description + "</p>"
                                )
                                
                                
                            }
                        });
                    })
                })
            })
            
        } catch (error) {
            
        }
        return (
            <div>
                <section>
                    <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>
                        <span  className="glyphicon glyphicon-question-sign"></span> Lisätietoja</button>

                    <Skylight 
                        dialogStyles={this.dialogStyle} 
                        hideOnOverlayClicked 
                        ref={ref => this.simpleDialog = ref} 
                        title={this.props.scenario}>

                        <div className="info_popup">

                        {/*html string has to be parsed with Parser helper*/}
                        {Parser(text)}
                        </div>
                    </Skylight>
                </section>
            </div>
        )
    }
}

export default InfoPopup