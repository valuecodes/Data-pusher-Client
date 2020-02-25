import React, { Component } from 'react'

export class QuarterQdebt extends Component {
    render() {
        return (
            <div className='quarterInfo'>
                <p className='qeText'>{this.props.year}</p>
                <p className='qeText'>{this.props.quarter}</p>
                <input className='qeText' type='number' value={this.props.assets}/>
                <input className='qeText' type='number' value={this.props.liabilities}/>
                <input className='qeText' type='number' value={this.props.qratio}/>
            </div>
        )
    }
}

export default QuarterQdebt
