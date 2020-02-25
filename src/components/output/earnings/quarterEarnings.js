import React, { Component } from 'react'

export class QuarterEarnings extends Component {
    render() {
        return (
            <div className='quarterInfo'>
                <p className='qeText'>{this.props.year}</p>
                <p className='qeText'>{this.props.quarter}</p>
                {/* <input className='qeText' type='Number' value={this.props.year}/> */}
                <input className='qeText' type='Number' value={this.props.eps}/>
                {/* <input className='qeText' type='Number' value={this.props.pe}/> */}
            </div>
        )
    }
}

export default QuarterEarnings
