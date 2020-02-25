import React, { Component } from 'react'

export class SearchResult extends Component {

    render() { 
        return (
            <div className='searchResult' key={this.props.id} onClick={this.props.clearList.bind(
                this,
                this.props.ticker,
                this.props.name,
                this.props.country,
                this.props.dividendType,
                this.props.sector,
                this.props.isin
                )}>
                <p>{this.props.ticker}</p>
                <p>{this.props.name}</p>
            </div>
        )
    }
}

export default SearchResult