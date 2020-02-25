import React, { Component } from 'react'

export class Info extends Component {
    render() {
        return (
            <div id='info'>
                <h3 className='headerBar'>{this.props.selectedCompany.id}</h3>
                <h3 className='headerBar'>{this.props.selectedCompany.name}</h3>
                <h3 className='headerBar'>{this.props.selectedCompany.country}</h3>
                <h3 className='headerBar'>{this.props.selectedCompany.dividendType}</h3>
                <h3 className='headerBar'>{this.props.selectedCompany.sector}</h3>
                <h3 className='headerBar'>{this.props.selectedCompany.industry}</h3>
            </div>
        )
    }
}

export default Info
