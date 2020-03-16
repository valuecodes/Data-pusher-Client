import React, { Component } from 'react'

export class HeaderYear extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.year}</h3>
            </div>
        )
    }
}

export default HeaderYear
