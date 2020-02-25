import React, { Component } from 'react'
import { QuarterEbit } from './quarterEbit'

export class Ebit extends Component {
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
        console.log(props);
        if (props.marginData !== null) {
            let baseData=state.data;
            let data=props.marginData;

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
            <div id='ebit'>
                <h2 className='quarterHeading'>Net Margin</h2>
                    <div className='quarterInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Quarter</h4>
                        <h4 className='qeText'>Revenue</h4>
                        <h4 className='qeText'>Net marg</h4>
                        <h4 className='qeText'>Net %</h4>                        
                    </div>
                {this.state.data.map(element => 
                    <QuarterEbit key={element[3]} year={element[4]} quarter={element[7]} revenue={element[0]} ebitda={element[1]} ebitdaMargin={element[2]}/>
                )}
            </div>
        )
    }
}

export default Ebit