import React, { Component } from 'react'
import { YearShares } from './yearShares'

export class Shares extends Component {

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
        if (props.sharesData !== null) {
            let baseData=state.data;
            let data=props.sharesData;
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
            <div id='shares'>
                <h2 className='quarterHeading'>Shares</h2>
                    <div className='quarterInfo'>
                        <h4 className='qeText'>Year</h4>
                        <h4 className='qeText'>Shares</h4>                       
                    </div>
                {this.state.data.map(element => 
                    <YearShares key={element[1]} year={element[2]} shares={element[0]}/>
                )}
            </div>
        )
    }
}

export default Shares
