import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';


class TableHtml extends Component {

    constructor(props){
        super(props);

       this.getValue = this.getValue.bind(this);
    }
    

    getValue(key, scenario){
        return this.props.getValue(key, scenario);
    }

    render () {
        const {scenarios,indicators} = this.props;

        const rows = indicators.map(category => {
            return category.ind.map(indicator => {
                return indicator;
            })
        })
        let myrow = "[";
        rows.forEach(row => {
            row.forEach(indicator => {
                myrow = myrow.concat('{"indicator":"'+indicator.label+'",');
                scenarios.forEach(scenario => {
                    
                    let value = this.getValue(indicator.value, scenario);
                    myrow = myrow.concat('"id_'+scenario.value+'":"'+value+'",')
                    
                })
                myrow = myrow.slice(0,-1);
                myrow = myrow.concat('},');
            })
            
        })
        myrow = myrow.slice(0,-1).concat(']');
        let products = [];
        try {
            products = JSON.parse(myrow);
        } catch (error) {
            console.log("JSON.parse error:" + error.message);
        }
        return (
            <BootstrapTable data={products} striped={true} hover={true}>
                <TableHeaderColumn isKey dataField='indicator'>Indikaattori</TableHeaderColumn>
                {scenarios.map(column => 
                    <TableHeaderColumn key={column.value} dataField={'id_'+column.value}>{column.label}</TableHeaderColumn>
                )}
            </BootstrapTable>
        )
    }
}

export default TableHtml