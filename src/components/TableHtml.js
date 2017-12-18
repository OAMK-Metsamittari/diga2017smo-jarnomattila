import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';


/**
 * TableHtml
 * Created:     2017-12-xx (Jarno Mattila)
 * Modified:    2017-12-18 (Jarno Mattila)
 * Description: Table view for indicators
 */

class TableHtml extends Component {

    constructor(props){
        super(props);

       this.getValue = this.getValue.bind(this);
    }
    

    /**
     * getValue
     * @param {*} key 
     * @param {*} scenario 
     */
    getValue(key, scenario){
        return this.props.getValue(key, scenario);
    }

    render () {

        const ln = require('../config/lang-'+this.props.lang).default.table_view;
        //props
        const {scenarios,indicators} = this.props;

        //each indicator is a row
        const rows = indicators.map(category => {
            return category.ind.map(indicator => {
                return indicator;
            })
        })

        // create json string by iterating rows and cols (scenarios)

        // start char of json array
        let myrow = "[";

        //iterate rows
        rows.forEach(row => {
            row.forEach(indicator => {

                //each row is a json object
                myrow = myrow.concat('{"indicator":"'+indicator.label+'",');

                //iterate columns
                scenarios.forEach(scenario => {
                    
                    // single and multi scenario tables has different cases
                    if(this.props.single && this.props.single.value === scenario.value){
                        let value = this.getValue(indicator.value, scenario);
                        myrow = myrow.concat('"id_'+scenario.value+'":"'+value+'",')
                    } else {
                        let value = this.getValue(indicator.value, scenario);
                        myrow = myrow.concat('"id_'+scenario.value+'":"'+value+'",')
                    }
                })

                //remove redudant char
                myrow = myrow.slice(0,-1);

                // end of object
                myrow = myrow.concat('},');
            })
            
        })

        //remove redudan char and add array ending
        myrow = myrow.slice(0,-1).concat(']');

        // parse json string to object
        let objects = [];
        try {
            objects = JSON.parse(myrow);
        } catch (error) {
            console.log("JSON.parse error:" + error.message);
        }

        //single scenario table
        if(this.props.single){
            return (
                <BootstrapTable 
                    data={objects} 
                    striped={true} 
                    hover={true}>
                    <TableHeaderColumn 
                        isKey 
                        dataField='indicator'>
                            {ln.indikaattori}
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        key={this.props.single.value} 
                        dataField={'id_'+this.props.single.value}>
                            {this.props.single.label}
                    </TableHeaderColumn>
                </BootstrapTable>
            )

        } else {
            return (
                <BootstrapTable 
                    data={objects} 
                    striped={true} 
                    hover={true}>
                    <TableHeaderColumn 
                        isKey 
                        dataField='indicator'>
                            {ln.indikaattori}
                        </TableHeaderColumn>
                    {
                        scenarios.map(column => 
                            <TableHeaderColumn 
                                key={column.value}
                                dataField={'id_'+column.value}>
                                    {column.label}
                            </TableHeaderColumn>
                    )}
                </BootstrapTable>
            )
        }
        
    }
}

export default TableHtml