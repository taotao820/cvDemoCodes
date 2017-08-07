/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import {clearFilter} from '../../../Action/register/registerActions';
import {getCharge} from '../../../Action/register/payAction';

class CardItem extends Component {
    constructor(props) {
        super(props);
    }
    cbF(e){
        let {code, cb, index, changeNum, myStates} = this.props;
        if(index === undefined){
            if(myStates.isRegisted&&!myStates.showChange){
                global.message.warning('只能退换号,退换号请点击已选号卡');
                return;
            }
            cb(code);
            this.setFilter();
        } else {
            if(changeNum){
                if(e.target.tagName != 'LI')
                this.props.dispatch({type: 'SHOW_MENU'})
            }else{
                cb(code, index)
                this.setFilter(true)
            }
        }
    }
    setFilter(e){
        let {regCodeList, dept, type, time, name, dispatch } = this.props;
        let filterTemp = Object.assign({}, regCodeList.filters);
        if(e){
            filterTemp.filtesRight['type'].currVal  = '';
            filterTemp.filtesRight['dept'].currVal  = '';
            filterTemp.filtesRight['docName'].currVal  = '';
            filterTemp.filtesRight['time'].currVal  = '';
        } else{
            filterTemp.filtesRight['type'].currVal  = type;
            filterTemp.filtesRight['dept'].currVal  = dept;
            filterTemp.filtesRight['docName'].currVal  = name;
            filterTemp.filtesRight['time'].currVal  = time;
        }
        dispatch({
            type: "SET_FILTER",
            filters: filterTemp
        });
    }
    shortStr(str,num){
        let title = str;
        if(str.length > num){
            title = str.substr(0,num)+ '...'
        }
        return title;
    }
    changeNum(){
        let {regCodeList, dispatch} = this.props;
        dispatch({type: 'SHOW_COVER'});
        dispatch({type: 'SHOW_CHANGE'})
        dispatch({type: 'SHOW_MENU'})
        // dispatch({type: 'CLEAR_CARDLIST'})
        dispatch(clearFilter(regCodeList));
    }
    returnNum(){
        let {dispatch, tempDatas, selectedCard, chargeOptions} = this.props;
        dispatch({type: 'SHOW_COVER'});
        dispatch({type: 'SHOW_CHARGE'});
        dispatch({type: 'SHOW_MENU'});
        getCharge(chargeOptions, selectedCard, '', tempDatas.regId)
    }
    render() {
        let {dept, number, name, code, type, time, cb, index, myStates, changeNum} = this.props;
        let typeTit = (type === undefined) ? '' : this.shortStr(type,4);
        let codeTit = (code === undefined) ? '' : this.shortStr(code,3);
        let nameTit = (name === undefined) ? '' : this.shortStr(name,6);
        let numberTit = (number === undefined) ? '' : (Number(number) >= 1000?'':number);

        return (
            <div className={style['cardItem']} onClick={this.cbF.bind(this)}>
                <div className={style['cardItem-top']}>
                    <span className={style['cardItem-top-left']}>{dept}</span>
                    <span className={style['cardItem-top-right']}>{numberTit}</span>
                </div>
                <div className={style['cardItem-mid']} title = {name}>{nameTit}</div>
                <div className={style['cardItem-bottom']}>
                    <span className={style['spanOdd']} title = {code}>{codeTit}</span>
                    <span className={style['spanEven']} title = {type}>{typeTit}</span>
                    <span className={style['spanOdd']}>{time}</span>
                </div>
                {
                    () =>{
                        if(myStates.showMenu && changeNum){
                            return  <ul className={style['cardItem-menu']}>
                                        <li onClick={this.changeNum.bind(this)}>换号</li>
                                        <li onClick={this.returnNum.bind(this)}>退号</li>
                                    </ul>
                        }
                    }()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {myStates, regCodeList, tempDatas, selectedCard, chargeOptions} = state;
    return {
        myStates, regCodeList, tempDatas, selectedCard, chargeOptions
    };
}
export default connect(mapStateToProps)(CardItem);
