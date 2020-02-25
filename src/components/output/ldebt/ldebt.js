import React, { Component } from 'react'
import { YearLDebt } from './yearLDebt'

export class LDebt extends Component {

    constructor() {
        super();
        this.state = {
            data:[],
        };
    }

    componentDidMount(){
        let data=[];
        for(let i=2020;i>2003;i--){
                data.push([undefined,i,i]);
        }
        this.setState({data:data});
    }
    
    static getDerivedStateFromProps(props, state) {
        if (props.lDebtData !== null) {

            let baseData=state.data;
            let data=props.lDebtData;

            for(var i=0;i<baseData.length;i++){
                let found=false;
                let res=data.forEach(element => {
                    if(element[2]===baseData[i][2]){
                        found=element;
                    }
                });
                if(found!==false){
                    baseData[i]=found;
                }
            }

            return {
                data: baseData
            }
        }
        return false
    }


    render() {
        return (
            <div id='lDebt'>
                <h2 className='yearHeading'>Long Debt</h2>
                    <div className='yearInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Debt</h4>                       
                    </div>
                {this.state.data.map(element => 
                    <YearLDebt key={element[1]} year={element[2]} debt={element[0]}/>
                )}
            </div>
        )
    }
}

export default LDebt