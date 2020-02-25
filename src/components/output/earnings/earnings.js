import React, { Component } from 'react'
import { QuarterEarnings } from './quarterEarnings'

export class Earnings extends Component {
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
                data.push([undefined,i,undefined,a,i+'/'+a]);
            }
        }
        this.setState({data:data});
    }   

    static getDerivedStateFromProps(props, state) {
        console.log(props);
        if (props.epsData !== null) {

            let baseData=state.data;
            let data=props.epsData;

            for(var i=0;i<baseData.length;i++){
                let found=false;
                let res=data.forEach(element => {
                    if(element[1]===baseData[i][1] && element[3]===baseData[i][3]){
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
            <div id='earnings'>
            <h2 className='quarterHeading'>Quarter Eps</h2>
                    <div className='quarterInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Quarter</h4>
                        <h4 className='qeText'>EPS</h4>                      
                    </div>
                {this.state.data.map(element => 
                    <QuarterEarnings key={element[4]} year={element[1]} quarter={element[3]} eps={element[0]}/>
                )}
            </div>
        )
    }
}

export default Earnings
