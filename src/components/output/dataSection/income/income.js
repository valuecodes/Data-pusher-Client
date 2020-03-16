import React, { Component } from 'react'
import {IncomeHeaders} from './incomeHeaders'
import { incomeValues, IncomeValues } from './incomeValues'

export class Income extends Component {

    constructor() {
        super();
        this.state = {
            data:[],
            income:[]
        };
    }

    static getDerivedStateFromProps(props, state) {
        
        if(props.incomeData[0][0]!==0){
            let values=props.incomeData;
            let balance=props.balanceData;
            let cashFlow=props.cashFlow;
            let ratios=props.ratiosData;

            let array=[];
            let bArray=[];
            let cArray=[];
            let rArray=[];

            for(var a=0;a<values[0].length;a++){
                let subArray=[];
                for(var i=1;i<values.length;i++){
                    subArray.push(values[i][a]);
                }
                array.push(subArray);
            }

            for(var a=0;a<balance[0].length;a++){
                let subArray=[];
                for(var i=1;i<balance.length;i++){
                    subArray.push(balance[i][a]);
                }
                bArray.push(subArray);
            }

            for(var a=0;a<cashFlow[0].length;a++){
                let subArray=[];
                for(var i=1;i<cashFlow.length;i++){
                    subArray.push(cashFlow[i][a]);
                }
                cArray.push(subArray);
            }

            for(var a=0;a<ratios[0].length;a++){
                let subArray=[];
                for(var i=1;i<ratios.length;i++){
                    subArray.push(ratios[i][a]);
                }
                rArray.push(subArray);
            }

            let total=[
                ...array,
                ...bArray,
                ...cArray,
                ...rArray
            ];
            return {
                income: total
            }
        }
        return false;
    }



    render() {
        console.log(this.props.incomeHeaders);
        if(this.props.incomeHeaders[0]!==0){
            let headers=[...this.props.incomeHeaders,
                ...this.props.balanceHeaders[6]===0?[]:this.props.balanceHeaders,
                ...this.props.cashFlowHeaders[2]===0?[]:this.props.cashFlowHeaders,
                ...this.props.ratiosHeaders[0]===0?[]:this.props.ratiosHeaders,
            ];
            console.log(headers);
            this.state.data=headers
        }
        
        console.log(this.state)
        return (
            <div id='incomeState'>
                <div id='IncomeHeaders'>
                    {this.state.data.map(element=>
                        <IncomeHeaders key={element} value={element}/>
                    )}                
                </div>

                <div className='incomeStateValues'>
                    {this.state.income.map(element=>
                        <IncomeValues key={element} 
                            value={element}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default Income
