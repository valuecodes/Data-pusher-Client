import React, { Component } from 'react'

export class InsiderTrades extends Component {
    render() {
        return (
            <div className='insiderInfo'>
                <p className='qeText'>{this.props.year}</p>
                <p className='qeText'>{this.props.quarter}</p>
                <p className='qeText'>{this.props.state}</p>
            </div>
        )
    }
}

export default InsiderTrades
