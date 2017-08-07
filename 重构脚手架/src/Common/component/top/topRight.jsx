/**
 * Created by tianjiachao on 2017/05/04.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import TabList from './tabList';
import SelectItem from '../../../Common/component/selectItem';
import {EDITE_PATINFO} from '../../js/constants';
import {fetchPatInfo, focusDom, printPatEwm} from '../../../Action/register/registerActions';

class Right extends Component {
    constructor(props) {
        super(props);
        this.state={
            cardNum: '',
            cardType: {
                title: '卡类型',
                size: 'small',
                id: 'cardTypeTop',
                options: [{key: '身份证',value: '身份证'}, {key: '社保卡',value: '社保卡'}],
                titleStyle: {color: 'white'}
            },
            nowCard: '身份证'
        }
    }
    handleChange(e){
        this.setState({ cardNum: e.target.value.trim() })
    }
    onSearchPress(e) { if(e.nativeEvent.keyCode == 13) this.searchOne() }
    searchAll(){
        this.props.dispatch({type: "SHOW_COVER"});
        this.props.dispatch({type: "SHOW_PATLIST"});
        // this.props.dispatch({type: "SHOW_PRINTER"});
        // printPatEwm()
    }
    searchOne(){
        if(this.state.cardNum.length > 0)
        fetchPatInfo(this.state.cardNum);
        this.props.dispatch({type: 'CLEAR_CARDLIST'});
        this.props.dispatch({type: "NO_REGISTED"});
    }
    cbSelect(e){
        this.setState({
            nowCard: e
        })
    }
    readCard(){
        global.readCard(this.state.nowCard).then(res => {
            return res.json();
        }).then(data=>{
            if(data.retCode == 0){
                this.setState({ cardNum: global.transCardInfo(data.retValue, this.state.nowCard).idNum});
                this.searchOne();
            }else{
                global.message.error('读卡错误,'+data.retValue);
            }
        });
    }
    render() {
        let {info} = this.props;
        let selInfo = this.state.cardType;
        selInfo.value = this.state.nowCard;
        return (
            <div className={style['right']}>
                <div className={style['right-top']}>
                    <div>
                        <span>{info.deptname}欢迎您，{info.name}</span>
                        <img src={require('../../img/top4.jpg')} alt=""/>
                        <span><a href={`${global.domainHis}exit.htm`}>退出</a></span>
                        <img src={require('../../img/top5.jpg')} alt=""/>
                        <span><a href={`${global.domainHis}platform.htm`}>首页</a></span>
                    </div>
                </div>
                <div className={style['right-mid']}>
                    <div className={style['search']}>
                        <i></i>
                        <input name="search_value" type="text" 
                            value={this.state.cardNum}
                            onChange={this.handleChange.bind(this)}
                            onKeyPress={this.onSearchPress.bind(this)}/>
                        <div className={style['search-inside']}>
                            <button onClick={this.searchOne.bind(this)} title="请输入就诊卡号或身份证号">搜索</button>
                        </div>
                    </div>
                    <div className={style['right-mid-search']}>
                        <button onClick={this.searchAll.bind(this)} title="查询患者历次就诊信息">搜索患者</button>
                    </div>
                    <div className={style['right-mid-cardType']}>
                        <SelectItem info={selInfo} cb={this.cbSelect.bind(this)}></SelectItem>
                    </div>
                    <div className={style['right-mid-btn']}>
                        <button onClick={this.readCard.bind(this)}>读卡</button>
                    </div>
                    <div className={style['clear']}></div>
                </div>
                <div className={style['right-tab']}>
                    <TabList/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps)(Right);
