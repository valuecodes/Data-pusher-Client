import React, { Component } from 'react'
import { element } from 'prop-types';

export class Input extends Component {

    constructor() {
        super();
        this.state = {
            inputValue:"",
            selected:null
        };
    }

    convert(active){

        // console.log(this.state.inputValue.split('jqxgrid'));
        let subH = this.state.inputValue.split('style="text-overflow: ellipsis; cursor: default;">');
        let ydata=[];
        let data=[];

        for(var i=3;i<subH.length;i++){
            data.push([
                Number(subH[i].split('</')[0].split('-')[0]),
                Number(subH[i].split('</')[0].split('-')[1]),
                Number(subH[i].split('</')[0].split('-')[2]),
                Math.ceil(Number(subH[i].split('</')[0].split('-')[1]/3))
            ]);
        }
        let type;
        let typeArray=[];
        let sub= this.state.inputValue.split('jqxgrid');
        for(var i=8;i<sub.length;i++){
            let count=0;
            let subType=sub[i].split('</')[0].split('>')[4];
            typeArray.unshift(subType);
            switch(sub[i].split('</')[0].split('>')[4]) {
                case 'Revenue':
                    type='mIncome'
                  break;
                case 'Cash On Hand':
                    type='mBalance'
                    break;
                case 'Net Income/Loss':
                    type='mCashFlow'
                    break;
                case 'Current Ratio':
                    type='mRatios'
                    break;
                default:
                  // code block
              }
            let heading=sub[i].split('</')[0].split('>')[4];
            let sub1=sub[i].split('margin-right:4px;">');
            if(heading===undefined){
                break;
            }
            for(var a=1;a<sub1.length;a++){
                let num=sub1[a].split('</div>')[0];
                num=num.replace(/[&nbsp;$]/g,'');
                num=num.replace(/,/g,'.');
                num=Number(num.replace(/−/g,'-'));
                data[count].unshift(num);
                count++;
            }
        }

        if(type==='mBalance'||type==='mCashFlow'||type==='mRatios'){
            for(var i=0;i<data.length;i++){
                data[i].pop();
                data[i].pop();
                data[i].pop();
                data[i].pop();
            }
        }
        console.log(typeArray);
        typeArray.shift();
        if(typeArray.length!==0){
            data.unshift(typeArray);
        }

        if(this.state.inputValue!=="" && active!==undefined){
            let value=this.state.inputValue
            value=value.split('\n');
            console.log(value);
            // let type;
            let add;
            switch(value[1]) {
                case 'INSIDER BUYING AND SELLING BY QUARTER':
                  type='insider'
                  break;
                default:
                //   type=undefined;
            }
            if(value[0]==='Date,Open,High,Low,Close,Adj Close,Volume'){
                type='yahoo';
            }
            
            if(value[0]==='Taloustiedot'){
                type='morningStar';
            }

            if(value[0]==='Date,Dividends'){
                type='yahooDiv';
            }
            if(value[2]==='CURRENT PRICE'){
                type='info';
            }
            if(value[0].split(' ')[value[0].split(' ').length-1]==='EPS'){
                console.log('succes');
                type='eps'
            }
            if(value[0].split('\t')[0]==='OSAKE'){
                type='talousmentor'
            }
            

            if(type!==undefined){
                if(type==='morningStar'){
                    let mIncome=[];
                    let mBalance=[];
                    let mCashFlow=[];
                    let mRatios=[];
                    for(var i=0;i<value[1].split('\t').length;i++){

                        mIncome.unshift([
                            Number(value[7].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            0,0,0,0,0,
                            Number(value[5].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                            Number(value[4].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            Number(value[1].split('\t')[i]),12,31,4]);

                        mBalance.unshift([0,0,0,0,0,0,
                            Number(value[14].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            0,0,0,
                            Number(value[13].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            Number(value[12].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            Number(value[11].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            0,0,0,0,
                            Number(value[10].split('\t')[i+1].replace(',','.').replace(/\s/g,''))
                            ,0,0,0,0]);

                        mCashFlow.unshift([0,0,
                            Number(value[19].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            0,0,0,0,0,0,0,0,
                            Number(value[18].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            0,0,0,0,0,0,0,
                            Number(value[17].split('\t')[i+1].replace(',','.').replace(/\s/g,'')),
                            0,0,0,0,0,0,0,0,0]);

                        mRatios.unshift([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                    }


                    mIncome.unshift([
                        value[7].split('\t')[0],
                        0,0,0,0,0,
                        value[5].split('\t')[0],
                        0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        value[4].split('\t')[0]])

                    mBalance.unshift([0,0,0,0,0,0,
                            value[14].split('\t')[0],
                            0,0,0,
                            value[13].split('\t')[0],
                            value[12].split('\t')[0],
                            value[11].split('\t')[0],
                            0,0,0,0,
                            value[10].split('\t')[0],
                            0,0,0,0]);
                    mCashFlow.unshift([0,0,
                        value[19].split('\t')[0],
                        0,0,0,0,0,0,0,0,
                        value[12].split('\t')[0],
                        0,0,0,0,0,0,0,
                        value[17].split('\t')[0],
                        0,0,0,0,0,0,0,0,0]);

                    mRatios.unshift([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

                    data[0]=mIncome;
                    data[1]=mBalance;
                    data[2]=mCashFlow;
                    data[3]=mRatios;
                }else if(type==='info'){
                    console.log(value[14].match(/[a-zA-Z\s]+$/)[0]);
                    let countryName=value[14].match(/[a-zA-Z\s]+$/)[0].substring(1);
                    data.push([
                        value[6],
                        value[8],
                        value[10],
                        value[12],
                        value[14],
                        value[18],
                        value[20],
                        value[1],
                        countryName
                    ])
                }else if(type==='insider'){
                    add=Number(value[0].split(':')[1].split('%')[0]);
                    for(var i=4;i<value.length;i++){
                        data.push([
                            value[i].split('\t')[1],
                            value[i].split('\t')[2],
                            value[i].split('\t')[3],
                            Number(value[i].split('\t')[4].replace(/,/g, '')),
                            Number(value[i].split('\t')[5].split('$')[1].replace(/,/g, '')),
                            Number(value[i].split('\t')[6].split('$')[1].replace(/,/g, '')),
                            Number(value[i].split('\t')[0].split('/')[2]),
                            Number(value[i].split('\t')[0].split('/')[0]),
                            Number(value[i].split('\t')[0].split('/')[1]),
                            Math.ceil(Number(value[i].split('\t')[0].split('/')[0]/3)),
                            i
                        ]);
                    } 
                }else if(type==='talousmentor'){
                    data=talousMentor(value);
                }else if(type==='yahoo'){
                    data=yahooPrice(value);
                }else if(type==='yahooDiv'){
                    data=yahooDiv(value);
                }
                // else{
                //     for(var i=3;i<value.length;i++){
                //         data.push([
                //             Number(value[i].split('\t')[1]),
                //             Number(value[i].split('\t')[2].split('$')[1]),
                //             Number(value[i].split('\t')[3]),
                //             Number(value[i].split('\t')[0].split('-')[0])+'/'+Math.ceil(Number(value[i].split('\t')[0].split('-')[1]/3)),
                //             Number(value[i].split('\t')[0].split('-')[0]),
                //             Number(value[i].split('\t')[0].split('-')[1]),
                //             Number(value[i].split('\t')[0].split('-')[2]),
                //             Math.ceil(Number(value[i].split('\t')[0].split('-')[1]/3))
                //         ]);
                //     }                
                // }
                console.log(data,type);
                this.props.addTickerData(data,type,add);
                this.clear();
            }
        }        
    }

    clear(){
        console.log('Clear')
        this.setState({inputValue:""})
    }

    valueInserted(e){
        this.setState({inputValue:e.target.value})
    }

    saveToDb(){
        this.props.saveToDb();
    }

    saveCountry(){
        let value=this.state.inputValue
        console.log(value);
        this.props.addTickerData(value,'country');
    }

    render() {
        return (
            <div className='input'>
                <textarea type='text' onChange={this.valueInserted.bind(this)} value={this.state.inputValue}/>
                <div id='inputButtons'>
                    <button id='convert' onClick={this.convert.bind(this,this.props.active)}>Convert</button>
                    <button id='clear' onClick={this.clear.bind(this)}>Clear</button>
                    <button id='saveCountry' onClick={this.saveCountry.bind(this,this.props.active)}>Country</button>
                    <button id='saveToDb' onClick={this.saveToDb.bind(this)}>Save To DB</button>                  
                </div>
            </div>
        )
    }
}

export default Input


let talousMentor=(value)=>{
    console.log('value');
    let forecast=0;
    let array=[];
    let aarray=[];
    let yearArray=[];
    let count=1;
    if(value[0].split('\t')[1].includes('e')){
        forecast=1;
    }

    for(var a=1+forecast;a<value[0].split('\t').length;a++){
        console.log(value[0].split('\t')[a]);
        for(var b=4;b>0;b--){
            array.push([Number(value[0].split('\t')[a]),b*3,b,count]);
            count++;
        }
    }

    for(var a=1+forecast;a<value[0].split('\t').length;a++){
        console.log(value[0].split('\t')[a]);
        for(var b=4;b>0;b--){
            aarray.push([count,Number(value[0].split('\t')[a]),b*3,30,b]);
            count++;
        }
    }

    for(var a=1+forecast;a<value[0].split('\t').length;a++){
        yearArray.push([count,Number(value[0].split('\t')[a])]);
        count++;
    }



    console.log(yearArray);
    let shares=JSON.parse(JSON.stringify(yearArray));
    let eps=JSON.parse(JSON.stringify(array));
    let margin=JSON.parse(JSON.stringify(aarray));
    let qdebt=JSON.parse(JSON.stringify(aarray));
    let lDebt=JSON.parse(JSON.stringify(aarray));
    let fcf=JSON.parse(JSON.stringify(aarray));

    for(var i=0;i<value.length;i++){
        if(value[i].split('\t')[0]==='OSAKE'){
            for(var a=0+forecast;a<value[0].split('\t').length-1;a++){
                // console.log(value[i].split('\t')[a+1],value[i+2].split('\t')[a]);
                let year=value[i].split('\t')[a+1];
                let sharesc=value[i+4].split('\t')[a].replace(/\s/g, '');
                console.log(year,sharesc);
                shares[0+(a-1)].unshift(Number(sharesc));
            }
        }
        // console.log(value[i].split('\t')[0]);
        if(value[i].split('\t')[0]==='Liikevaihto'){
            console.log('founfssssssssssssssssssssssssssssssssssssssssssss');
            for(var a=2+forecast;a<value[i-1].split('\t').length-1;a++){
                // console.log(value[i].split('\t')[a+1],value[i+2].split('\t')[a]);
                let year=value[i-1].split('\t')[a+forecast];
                let revenuec=value[i+2-1].split('\t')[a+forecast-1].replace(/\s/g, '.');
                let netc=value[i+6-1].split('\t')[a+forecast-1].replace(/\s/g, '').replace(/,/g, '');
                let marginc=value[i+8-1].split('\t')[a+forecast-1].split('%')[0].replace(/,/g, '.');
                let epsc=value[i+10-1].split('\t')[a+forecast-1].replace(/,/g, '.');
                console.log(year,epsc,revenuec,marginc,netc);
                // let shares=value[i+2].split('\t')[a].replace(/,/g, '');

                margin[0+(a-3)*4].unshift(Number(marginc));
                margin[0+(a-3)*4].unshift(Number((netc/4).toFixed(2)));
                margin[0+(a-3)*4].unshift(Number((revenuec/4).toFixed(2)));

                margin[1+(a-3)*4].unshift(Number(marginc));
                margin[1+(a-3)*4].unshift(Number((netc/4).toFixed(2)));
                margin[1+(a-3)*4].unshift(Number((revenuec/4).toFixed(2)));

                margin[2+(a-3)*4].unshift(Number(marginc));
                margin[2+(a-3)*4].unshift(Number((netc/4).toFixed(2)));
                margin[2+(a-3)*4].unshift(Number((revenuec/4).toFixed(2)));

                margin[3+(a-3)*4].unshift(Number(marginc));
                margin[3+(a-3)*4].unshift(Number((netc/4).toFixed(2)));
                margin[3+(a-3)*4].unshift(Number((revenuec/4).toFixed(2)));

                eps[0+(a-3)*4].unshift(Number((epsc/4).toFixed(2)));
                eps[1+(a-3)*4].unshift(Number((epsc/4).toFixed(2)));
                eps[2+(a-3)*4].unshift(Number((epsc/4).toFixed(2)));
                eps[3+(a-3)*4].unshift(Number((epsc/4).toFixed(2)));
            }
        }

        if(value[i].split('\t')[0]==='TASE'){
            for(var a=0+forecast;a<value[0].split('\t').length-1;a++){
                // console.log(value[i].split('\t')[a+1],value[i+2].split('\t')[a]);
                let year=value[i].split('\t')[a+1];

                let fix=0;
                if(value[i+14].split('\t')[0]==='Muut vastuut'){
                    
                    fix=1;
                }
                console.log(year,value[i+14-fix].split('\t'));
                let assets=Number(value[i+2].split('\t')[a].replace(/\s/g, ''));
                let liabilities=Number(value[i+14-fix].split('\t')[a].replace(/\s/g, ''));
                console.log(year,assets,liabilities);
                // console.log(value[i+2].split('\t')[a]);
                qdebt[0+(a-1)*4].unshift(Number((assets/liabilities).toFixed(2)));
                qdebt[0+(a-1)*4].unshift(Number(liabilities));
                qdebt[0+(a-1)*4].unshift(Number(assets));

                qdebt[1+(a-1)*4].unshift(Number((assets/liabilities).toFixed(2)));
                qdebt[1+(a-1)*4].unshift(Number(liabilities));
                qdebt[1+(a-1)*4].unshift(Number(assets));

                qdebt[2+(a-1)*4].unshift(Number((assets/liabilities).toFixed(2)));
                qdebt[2+(a-1)*4].unshift(Number(liabilities));
                qdebt[2+(a-1)*4].unshift(Number(assets));

                qdebt[3+(a-1)*4].unshift(Number((assets/liabilities).toFixed(2)));
                qdebt[3+(a-1)*4].unshift(Number(liabilities));
                qdebt[3+(a-1)*4].unshift(Number(assets));

                lDebt[0+(a-1)*4].unshift(Number((liabilities).toFixed(2)));
            }
        }

        if(value[i].split('\t')[0]==='RAHAVIRTA'){
            console.log(value[i].split('\t'))
            for(var a=0+forecast;a<value[0].split('\t').length-1;a++){
                // console.log(value[i].split('\t')[a+1],value[i+2].split('\t')[a]);
                let year=value[i].split('\t')[a+1];
                // console.log(year);
                let fcfc=Number(value[i+6].split('\t')[a].replace(/\s/g, '').replace(/,/g, ''));
                let shares=Number(value[4].split('\t')[a].replace(/\s/g, ''));
                let price=Number(value[2].split('\t')[a].replace(/,/g, '.'));
                let fcfpShare=Number(((fcfc*1000)/shares).toFixed(2))
                let pfcf=Number((price/fcfpShare).toFixed(2));
                console.log(value[2].split('\t')[a].replace(/','/g, '.'));
                // let liabilities=Number(value[i+14].split('\t')[a]);
                console.log(year,shares,price,fcfpShare,pfcf);
                // console.log(value[i+2].split('\t')[a]);
                fcf[0+(a-1)*4].unshift(price,fcfpShare,pfcf);
                fcf[1+(a-1)*4].unshift(price,fcfpShare,pfcf);
                fcf[2+(a-1)*4].unshift(price,fcfpShare,pfcf);
                fcf[3+(a-1)*4].unshift(price,fcfpShare,pfcf);

                // qdebt[1+(a-1)*4].unshift(Number((assets/liabilities).toFixed(2)));

                // qdebt[2+(a-1)*4].unshift(Number((assets/liabilities).toFixed(2)));

                // qdebt[3+(a-1)*4].unshift(Number((assets/liabilities).toFixed(2)));
            }
        }

    }
    console.log(fcf);
    let insider=[['null','null','null',0,0,0,2020,1,1,1,0]];
    let result={
        eps:eps,
        shares:shares,
        margin:margin,
        qdebt:qdebt,
        ldebt:lDebt,
        fcfData:fcf,
        insider:insider
    }
    return result;
}

let yahooPrice=(value)=>{
    let array=[];
    for(var i=value.length-1;i>0;i--){
        array.push([
            Number(value[i].split(',')[1]),
            Number(value[i].split(',')[2]),
            Number(value[i].split(',')[3]),
            Number(value[i].split(',')[4]),
            Number(value[i].split(',')[6]),
            0,
            Number(value[i].split(',')[0].split('-')[0]),
            Number(value[i].split(',')[0].split('-')[1]),
            Number(value[i].split(',')[0].split('-')[2]),
            Math.ceil(Number(value[i].split(',')[0].split('-')[1])/3)
        ])
    }
    array.unshift();
    return array;
}

let yahooDiv=(value)=>{
    let array=[];
    for(var i=value.length-1;i>=0;i--){
        console.log(value[i]);
        array.push([
            Number(value[i].split(',')[1]),
            value[i].split(',')[0],
            Number(value[i].split(',')[0].split('-')[0]),
            Number(value[i].split(',')[0].split('-')[1]),
            Number(value[i].split(',')[0].split('-')[2]),
            Math.ceil(Number(value[i].split(',')[0].split('-')[1])/3),
            'FIN'
        ])
    }
    let sorted=[];
    for(var a=2030;a>2000;a--){
        for(var b=12;b>=0;b--){
            for(var z=array.length-1;z>=0;z--){            
                if(array[z][2]===a&&array[z][3]===b){
                    sorted.push(array[z]);
                }                 
            }
        }
    }
    console.log(sorted);
    return sorted;
}