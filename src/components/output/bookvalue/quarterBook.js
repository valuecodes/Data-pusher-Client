import React, { Component } from 'react'

export class QuarterBook extends Component {
    render() {
        return (
            <div className='quarterInfo'>
                <p className='qeText'>{this.props.year}</p>
                <p className='qeText'>{this.props.quarter}</p>
                <input className='qeText' type='number' value={this.props.revenue}/>
                <input className='qeText' type='number' value={this.props.ebitda}/>
                <input className='qeText' type='number' value={this.props.ebitdaMargin}/>
            </div>
        )
    }
}

export default QuarterBook
