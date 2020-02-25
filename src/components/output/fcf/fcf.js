import React, { Component } from 'react'
import { QuarterFcf } from './quarterFcf'

export class Fcf extends Component {
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
        if (props.fcfData !== null) {

            let baseData=state.data;
            let data=props.fcfData;

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
            <div id='fcf'>
            <h2 className='quarterHeading'>Quarter FCF</h2>
                    <div className='quarterInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Quarter</h4>
                        <h4 className='qeText'>Stock Price</h4>
                        <h4 className='qeText'>FCF</h4>
                        <h4 className='qeText'>P/FCF</h4>                        
                    </div>
                {this.state.data.map(element => 
                    <QuarterFcf key={element[3]} year={element[4]} quarter={element[7]} stockPrice={element[0]} fcf={element[1]} pfcf={element[2]}/>
                )}
            </div>
        )
    }
}

export default Fcf
