import React, { Component } from 'react'
import Skylight from 'react-skylight'
import Parser from 'react-html-parser'

class InfoPopup extends Component {

    constructor(props){
        super(props);

        this.dialogStyle = {
           backgroundColor : "rgba(26, 75, 26,0.8)",
           color: "rgb(255,255,255)",
           textAlign:"left"
        }
        
    }

    componentDidMount()
    {
        
        

    }

    render () {

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
                    <button className="btn btn-primary" onClick={() => this.simpleDialog.show()}>Lisätietoja</button>
                    <Skylight dialogStyles={this.dialogStyle} hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={this.props.scenario}>
                    <div className="info_popup">
                      {Parser(text)}
                    </div>
                    </Skylight>
                </section>
            </div>
        )
    }
}

export default InfoPopup