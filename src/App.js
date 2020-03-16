import React, { Component } from 'react'
import './App.css';
import { SelectCompany } from './components/selectCompany/selectCompany'
import { Input } from './components/input/input'
import { Output } from './components/output/output'

export class App extends Component {
  constructor() {
    super();
    this.state = {
        active:[],
        // earningsData:null,
        // fcfData:[[0.0, 0.0, 0.0, 1, 2019, 12, 1, 4]],
        // qDebtData:[[0, 0, 0.0, 1, 2019, 12, 1, 4]],
        // sharesData:[[0, 1, 2019]],
        // lDebtData:[[0, 1, 2019, 12, 1, 4]],
        // ebitData:null,
        // epsData:[[0.0, 2019, 12, 4, 1]],
        // marginData:[[0.0, 0.0, 0.0, 1, 2019, 12, 1, 4]],
        insiderData:[['null','null','null',0,0,0,2020,1,1,1,0]],
        weekData:null,
        mIncome:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2019,12,31,4]],
        mBalance:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        mCashFlow:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
        mRatios:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
    };
  }

  selectTicker(id,name,country,dividendType,sector,isin,wData,dData){
    console.log(id,name,country,dividendType,sector,isin,wData,dData);
    let selected={
      name:name,
      id:id,
      country:country,
      dividendType:dividendType,
      sector:sector,
      isin:isin,
    }
    for(var i=0;i<dData.length;i++){
      dData[i].push(country);
    }
      
    this.setState({active:selected,weekData:wData,divData:dData});
  }

  addTickerData(data,type,add){
    // console.log(JSON.stringify(this.state.active));
    let info=this.state.active;
    if(JSON.stringify(this.state.active) !== '[]'){
      switch(type) {
        case 'morningStar':
          this.setState({mIncome:data[0],mBalance:data[1],mCashFlow:data[2],mRatios:data[3]});        
          break;
        case 'mIncome':
          this.setState({mIncome:data});        
          break;
        case 'mBalance':
          this.setState({mBalance:data});        
          break;
        case 'mCashFlow':
          this.setState({mCashFlow:data});        
          break;
        case 'mRatios':
          this.setState({mRatios:data});        
          break;
          case 'fcf':
          this.setState({fcfData:data});  
          break;
        case 'qdebt':
          this.setState({qDebtData:data});  
          break;
        case 'shares':
          this.setState({sharesData:data});  
          break;
        case 'ldebt':
          this.setState({lDebtData:data});  
          break;
        case 'margin':
          this.setState({marginData:data});  
          break;
        case 'eps':
          this.setState({epsData:data});  
          break;
        case 'country':
          let tInfo=this.state.active
          tInfo.country=data;
          this.setState({active:tInfo});  
          break;
        case 'insider':
          info.insiderStake=add;
          this.setState({insiderData:data,active:info});  
          break;
        case 'yahoo':
          this.setState({weekData:data});  
          break;
        case 'yahooDiv':
          let weekD=this.state.weekData;
          weekD=addDivs(data,weekD);
          info.insiderStake=0;
          this.setState({weekData:weekD,divData:data,active:info});  
          break;
        case 'talousmentor':
          this.setState({qDebtData:data.qdebt,epsData:data.eps,sharesData:data.shares,marginData:data.margin,lDebtData:data.ldebt,fcfData:data.fcfData,insiderData:data.insider});  
          break;
        case 'info':
          console.log(data)
          // console.log(this.state.active.sector=)
          info.sector=data[0][0];
          info.industry=data[0][1];
          info.subindustry=data[0][2];
          info.founded=data[0][3];
          info.address=data[0][4];
          info.website=data[0][5];
          info.employees=data[0][6];
          info.description=data[0][7];
          info.countryName=data[0][8];
          this.setState({active:info}); 
          console.log(info);
          break;
        default:
          type=null;
      }
    }else{
      console.log('Select company first');
    }
  }

  saveToDb(){
    console.log('save');
    console.log(this.state);

    let combined=[];

    for(var i=0;i<this.state.mIncome.length;i++){
      combined[i]=[...this.state.mIncome[i],...this.state.mBalance[i],...this.state.mCashFlow[i],...this.state.mRatios[i]]
    }
    console.log(combined);
    this.state.combined=combined;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': "application/json;charset=UTF-8"
      },
      body: JSON.stringify(this.state)
    }


    console.log(this.options);

    // Create ticker to database if not exist

    fetch('/saveTickerData', options)
      .then(res => res.json())
      .then(message => console.log(message));
  }

  manualUpdate(data){
    console.log('Manually updated',data);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <header id='header'>
          <SelectCompany addTicker={this.selectTicker.bind(this)}/>
        </header>
        <div id='body'>
          <Input addTickerData={this.addTickerData.bind(this)} saveToDb={this.saveToDb.bind(this)} active={this.state.active.id}/>
          <Output 
          selectedCompany={this.state.active}
          mIncome={this.state.mIncome}
          mBalance={this.state.mBalance}
          mCashFlow={this.state.mCashFlow}
          mRatios={this.state.mRatios}
          insiderData={this.state.insiderData} 
          />
        </div> 
      </div>
    )
  }
}

export default App

let addDivs=(data,divData)=>{
  let count=0;
  for(var a=0;a<divData.length;a++){
    console.log(divData.length);
    if(divData[a][6]===data[count][2] && divData[a][7]===data[count][3]){
      divData[a][5]=data[count][0];
      count++;
      if(count===data.length){
        break;
      }
    }
  }
  return divData;
}