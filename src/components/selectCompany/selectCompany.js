import React, { Component } from 'react'
import tickers from './tickers'
import { SearchResult } from './searchResult'

export class SelectCompany extends Component {

    constructor() {
        super();
        this.state = {
            tickers:[],
            matches: [],
            active:[]
        };
    }

    componentDidMount(){
        this.setState({tickers:tickers})
    }

    searchstocks=(e)=>{
        let matchValues = Object.values(this.state.tickers.filter(ticker=>{
            const regex = new RegExp(`^${e.target.value}`,'gi');
            return ticker.name.match(regex) || ticker.ticker.match(regex);
        }))
        if(e.target.value.length===0){
            matchValues=[];
        }
        let create=(matches)=>{
            this.setState({matches});
        }
        // console.log(matchValues);
        create(matchValues);
    }
    clearList(id,name,country,dividendType,sector,isin){
        console.log(country);
        if(country==='USA'){
            fetch('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol='+id+'&apikey=0V8NA38XWCB9WR44')
                .then(res => res.json())
                .then(response =>{
                    let data=getWData(response);
                    this.setState({active:[id]});
                    this.setState({matches:[]});
                    this.props.addTicker(id,name,country,dividendType,sector,isin,data.wData,data.dData);                  
                });
        }else{
            console.log(id,name,country,dividendType,sector,isin);
            this.setState({active:[id]});
            this.setState({matches:[]});
            this.props.addTicker(id,name,country,dividendType,sector,isin,[],[]);  
        }

    }

    render() {
        return (
            <div id='selectCompany'>
                <div className='searchBar'>
                    <div className='search'>
                        <input className='searchBox' type='text' name='searchBox' placeholder='Search stocks' autoComplete='off' onChange={this.searchstocks}/>
                    </div>
                    <div className='results'>
                        {this.state.matches.slice(0,10).map(ticker =>
                            <SearchResult key={ticker.ticker} ticker={ticker.ticker} name={ticker.name} country={ticker.country} dividendType={ticker.dividendType} sector={ticker.sector} isin={ticker.isin} clearList={this.clearList.bind(this)} addTicker={this.state.active}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectCompany


let getWData=(data)=>{
    let key=Object.keys(data['Weekly Adjusted Time Series'])
    console.log(key);
    let array=[];
    let div=[];
    let previous=null;
    let split=1;
    for(var i=0;i<key.length;i++){
        if(previous!==null){
            let test= Number(data['Weekly Adjusted Time Series'][key[i]]['4. close'])/previous;
            if(test>1.8){
                split=Math.round(test)*split;
            }            
        }
        array.push([
            Number(data['Weekly Adjusted Time Series'][key[i]]['1. open'])/split,
            Number(data['Weekly Adjusted Time Series'][key[i]]['2. high'])/split,
            Number(data['Weekly Adjusted Time Series'][key[i]]['3. low'])/split,
            Number(data['Weekly Adjusted Time Series'][key[i]]['4. close'])/split,
            Number(data['Weekly Adjusted Time Series'][key[i]]['6. volume']),
            Number(data['Weekly Adjusted Time Series'][key[i]]['7. dividend amount'])/split,
            Number(key[i].split('-')[0]),
            Number(key[i].split('-')[1]),
            Number(key[i].split('-')[2]),
            getQuarter(key[i])          
        ])
        if(Number(data['Weekly Adjusted Time Series'][key[i]]['7. dividend amount'])/split!==0){
            div.push([
                Number(data['Weekly Adjusted Time Series'][key[i]]['7. dividend amount'])/split,
                key[i],
                Number(key[i].split('-')[0]),
                Number(key[i].split('-')[1]),
                Number(key[i].split('-')[2]),
                getQuarter(key[i])   
            ])
        }
        previous=Number(data['Weekly Adjusted Time Series'][key[i]]['4. close']);
    }
    let rdata={
        wData:array,
        dData:div
    }
    // console.log(array);
    return rdata;
}

let getQuarter=(date)=>{
    return Math.ceil(date.split('-')[1]/3);
}