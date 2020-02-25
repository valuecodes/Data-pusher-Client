import React, { Component } from 'react'

export class QuarterFcf extends Component {
    render() {
        return (
            <div className='quarterInfo'>
                <p className='qeText'>{this.props.year}</p>
                <p className='qeText'>{this.props.quarter}</p>
                <input className='qeText' type='number' value={this.props.stockPrice}/>
                <input className='qeText' type='number' value={this.props.fcf}/>
                <input className='qeText' type='number' value={this.props.pfcf}/>
            </div>
        )
    }
}

export default QuarterFcf
