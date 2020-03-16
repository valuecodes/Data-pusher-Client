import React, { Component } from 'react'
import { Info } from './info'
import { DataHeader } from './dataSection/header'
import { Insider } from './insider/insider'
import { Income } from './dataSection/income/income'

export class Output extends Component {
    render() {
        return (
            <div id='output'>
                <div id='dataHeader'>
                    <Info selectedCompany={this.props.selectedCompany}/>
                </div>
                <div id='dataSection'>
                    <div id='dataValues'>
                        <DataHeader headerData={this.props.mIncome}/>
                        <Income 
                        incomeData={this.props.mIncome} 
                        incomeHeaders={this.props.mIncome[0]} 

                        balanceData={this.props.mBalance} 
                        balanceHeaders={this.props.mBalance[0]} 

                        cashFlow={this.props.mCashFlow} 
                        cashFlowHeaders={this.props.mCashFlow[0]}

                        ratiosData={this.props.mRatios} 
                        ratiosHeaders={this.props.mRatios[0]}     
                        />
                        
                    </div>
                    <Insider insiderData={this.props.insiderData}/>
                </div>
            </div>
        )
    }
}

export default Output
