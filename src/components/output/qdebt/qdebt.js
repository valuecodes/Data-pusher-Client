import React, { Component } from 'react'
import { QuarterQdebt } from './quarterQdebt'

export class Qdebt extends Component {
    constructor() {
        super();
        this.state = {
            data:[],
        };
    }

    componentDidMount(){
        let data=[];
        for(let i=2020;i>2003;i--){
            for(let a=4;a>=1;a--){
                data.push([undefined,undefined,undefined,i+'/'+a,i,undefined,undefined,a]);
            }
        }
        this.setState({data:data});
    }

    static getDerivedStateFromProps(props, state) {
        
        if (props.qDebtData !== null) {

            let baseData=state.data;
            let data=props.qDebtData;
            console.log(props);
            for(var i=0;i<baseData.length;i++){
                let found=false;
                let res=data.forEach(element => {
                    if(element[4]===baseData[i][4] && element[7]===baseData[i][7]){
                        found=element;
                    }
                });
                if(found!==false){
                    baseData[i]=found;
                }
            }
            return {
                data: baseData,
            }
        }
        return false
    }

    render() {
        return (
            <div id='qDebt'>
                <h2 className='quarterHeading'>Short Debt</h2>
                    <div className='quarterInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Quarter</h4>
                        <h4 className='qeText'>Assets</h4>
                        <h4 className='qeText'>Liabilities</h4>
                        <h4 className='qeText'>Qratio</h4>                        
                    </div>
                {this.state.data.map(element => 
                    <QuarterQdebt key={element[3]} year={element[4]} quarter={element[7]} assets={element[0]} liabilities={element[1]} qratio={element[2]}/>
                )}
            </div>
        )
    }
}

export default Qdebt
