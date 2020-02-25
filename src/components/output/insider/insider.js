import React, { Component } from 'react'
import { InsiderTrades } from './insiderTrades';

export class Insider extends Component {

    constructor() {
        super();
        this.state = {
            data:[],
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.insiderData !== null) {
            return {
                data: props.insiderData
            }
        }
        return false
    }  


    render() {
        return (
            <div id='insider'>
                <h2 className='quarterHeading'>Insider Trades</h2>
                    <div className='quarterInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Quarter</h4>
                        <h4 className='qeText'>State</h4>                 
                    </div>
                {this.state.data.map(element => 
                    <InsiderTrades key={element[10]} year={element[6]} quarter={element[9]} state={element[2]} />
                )}
            </div>
        )
    }
}

export default Insider
