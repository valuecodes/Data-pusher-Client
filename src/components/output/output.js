import React, { Component } from 'react'
import { Info } from './info'
import { Earnings } from './earnings/earnings';
import { Fcf } from './fcf/fcf';
import { Qdebt } from './qdebt/qdebt';
import { Shares } from './shares/shares'
import { LDebt } from './ldebt/ldebt'
import { Ebit } from './ebit/ebit'
import { BookValue } from './bookvalue/bookvalue'
import { Insider } from './insider/insider'

export class Output extends Component {
    render() {
        return (
            <div id='output'>
                <div id='dataHeader'>
                    <Info selectedCompany={this.props.selectedCompany}/>
                </div>
                <div id='dataSection'>
                    
                    {/* <BookValue ebitData={this.props.ebitData} manualUpdate={this.props.manualUpdate}/> */}

                    <Earnings epsData={this.props.epsData}/>
                    <Fcf fcfData={this.props.fcfData}/>
                    <Qdebt qDebtData={this.props.qDebtData}/>
                    <Ebit marginData={this.props.marginData}/>
                    <div id='yearlyData'>
                        <LDebt lDebtData={this.props.lDebtData}/>
                        <Shares sharesData={this.props.sharesData}/>
                    </div>
                    <Insider insiderData={this.props.insiderData}/>
                    
                </div>
            </div>
        )
    }
}

export default Output
