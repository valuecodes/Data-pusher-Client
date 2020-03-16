import React, { Component } from 'react'
import { element } from 'prop-types';

export class IncomeValues extends Component {

    constructor() {
        super();
        this.state = {
            data:[],
        };
    }

    render() {
        this.state.data=this.props.value;
        return (
            <div id='stateValue'>
                {this.state.data.map(element=>
                    <p>{element}</p>
                )}
            </div>
        )
    }
}

export default IncomeValues
