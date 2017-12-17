import React, { Component } from 'react'
import InfoPopup from './InfoPopup'
import TableHtml from './TableHtml'
const ReactHighcharts = require('react-highcharts');
const HighchartsMore = require('highcharts-more');
const HighchartsExporting = require('highcharts/modules/exporting')
HighchartsMore(ReactHighcharts.Highcharts);
HighchartsExporting(ReactHighcharts.Highcharts);
class Chart extends Component {

    constructor(props){
        super(props);

        this.labels = [];
        this.data = [];
        this.chartType = 'polar';

        this.modal = {
            modalIsOpen : false,
        }

        this.getValue = this.getValue.bind(this);
        this.setValues = this.setValues.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);

    }
   

    closeModal(){
        this.modal = ({modalIsOpen : false})
    }

    openModal(){
        this.modal = ({modalIsOpen : true})
    }
    
    getValue(key){
        let myValue = 0;
        try {
            this.props.values.forEach(value => {
                
                if( parseInt(value.scenarioId, 10) === parseInt(this.props.scenario.value, 10) 
                && parseInt(value.timePeriodId, 10) === parseInt(this.props.period.id, 10)
                && parseInt(value.indicatorId, 10) === parseInt(key, 10) ){
                    myValue = parseFloat(value.value);
                }
            });
        } catch (error) {
            
        }
        
        return myValue;
    }

    setValues(){
        let stateLabels = [];
        let stateData = [];
        try {
            let counter = 0;
            this.props.myIndicators.forEach(category => {
                category.ind.forEach(indicator => {
                    let key = indicator.value;
                    let label = indicator.label;
                   let indData = this.getValue(key);
                    stateLabels.push(label);
                    stateData.push({'x':counter++,'y':indData});
                });
            });
        } catch (error) {
            console.log(error.message)
        }
        this.labels = stateLabels;
        this.data = stateData;
       
    }

    render () {
        this.setValues();
       
        //props
        const{period, region, scenario} = this.props;

        //this.indicatorKeys();
        if(this.props.chartType !== 'table'){
            let type = this.props.chartType ==='polar';

            const config = {

                events:{
                    click : function(event) {
                        let lbl = this.renderer.label("kukkelikuu").attr({
                            fill:this.getOptions().colors[0],
                            padding:10,
                            r:5,
                            zIndex:8
                        }).css({
                            color:'#ffffff'
                        }).add();
                        setTimeout(function(){
                            lbl.fadeOut();
                        }, 1000);
                    }
                },
                
                chart: {
                    polar:type,
                    type:'column'
                },
                pane :{
                    size:'90%'
                },
            
                title: {
                    text: region.name + " " 
                        + period.yearStart + " - (" 
                        + period.yearEnd + ")"
                },
                yAxix: {
                    min: 0,
                
                    
                },
                xAxis: {
                categories:this.labels
                },

            plotOptions :{
                
                    series: {
                        shadow: false,
                        groupPadding:0,
                        pointPlacement: 'on',
                        color: '#0E7746'
                    }
            },
                legend: {
                    
                    verticalAlign: 'top',
                    y:20
                },
                series:[{
                    name: scenario.label,
                    data: this.data
                }],
            };
            
            return (<div className="chart_view" id="chartElement">
                    
                    <ReactHighcharts config={ config }></ReactHighcharts>
                    <InfoPopup 
                        myIndicatorsArray = {this.props.myIndicators}
                        scenario = {scenario.label}
                        indicatorCategories = {this.props.indicatorCategories}
                    />
                    <a href= { this.props.melaLink(scenario.value)
                    
                    } target="_blank">Tarkat tiedot</a>
                    
    
                </div>) 
        } else {

            return (
                <div>
                    <a href= { this.props.melaLink()
                        
                    } target="_blank">Tarkat tiedot</a>
                    <div className={scenario.value}>
                        <TableHtml 
                            scenarios = {this.props.myScenarios}
                            indicators = {this.props.myIndicators}
                            values = {this.props.values}
                            getValue = {this.getValue}
                            single = {scenario}
                        />
                    </div>
                   
                </div>
                )

        }
    }
        
  
        
 
}

export default Chart
