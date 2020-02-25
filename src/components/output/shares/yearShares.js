import React, { Component } from 'react'

export class YearShares extends Component {
    render() {
        return (
            <div className='quarterInfo'>
                <p className='qeText'>{this.props.year}</p>
                <p className='qeText'>{this.props.shares}</p>
            </div>
        )
    }
}

export default YearShares
