import React, { Component } from 'react'

export class YearLDebt extends Component {
    render() {
        return (
            <div className='yearInfo'>
                <p className='qeText'>{this.props.year}</p>
                <p className='qeText'>{this.props.debt}</p>
            </div>
        )
    }
}

export default YearLDebt