import React, { Component } from 'react'
import { QuarterBook } from './quarterBook'

export class BookValue extends Component {
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
        console.log(data);
        this.setState({data:data});
    }

    static getDerivedStateFromProps(props, state) {

        if (props.ebitData !== null) {

            let baseData=state.data;
            let data=props.ebitData;

            for(var i=0;i<baseData.length;i++){
                let found=false;
                let res=data.forEach(element => {
                    // console.log(element[5],baseData[i][5]);
                    if(element[4]===baseData[i][4] && element[7]===baseData[i][7]){
                        console.log('found')
                        found=element;
                    }
                    // console.log(element.includes(baseData[i][5]));
                });
                console.log(found);
                if(found!==false){
                    baseData[i]=found;
                }
                // console.log(data.includes(baseData[i][4]));
                // baseData[i]=res;
            }
            
            console.log(baseData);

            return {
                data: baseData,
            }
        }
        return false
    }
    render() {
        return (
            <div id='bookValue'>
                <h2 className='quarterHeading'>Book Value</h2>
                    <button onClick={this.props.manualUpdate.bind(this,this.state.data)} className='manualUpdate'>Update</button>
                    <div className='quarterInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Quarter</h4>
                        <h4 className='qeText'>Revenue</h4>
                        <h4 className='qeText'>Ebitda</h4>
                        <h4 className='qeText'>Ebitda %</h4>                        
                    </div>
                {this.state.data.map(element => 
                    <QuarterBook key={element[3]} year={element[4]} quarter={element[7]} revenue={element[0]} ebitda={element[1]} ebitdaMargin={element[2]}/>
                )}
            </div>
        )
    }
}

export default BookValue
