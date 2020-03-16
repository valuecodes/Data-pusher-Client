import React, { Component } from 'react'
import {HeaderYear} from './headerYear'

export class DataHeader extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
        };
    }


    render() {
        if(this.props.headerData.lenght>1){
            let array=this.props.headerData;
            array.shift();
            this.state.data=array;
        }else{
            this.state.data=this.props.headerData;
        }
        return (
            <div id='dataHeaderBar'>
                <h3>Year</h3>
                {this.state.data.map(element => 
                    <HeaderYear key={element[0]} year={element[22]} />
                )}
            </div>
        )
    }
}

export default DataHeader
