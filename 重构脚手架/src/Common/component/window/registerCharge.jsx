/**
 * Created by xuhuitao on 2017/05/12.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import style from "./style";
import classNames from "classnames";
import InputItem from '../inputItem';
import SelectItem from '../selectItem';
import Btn from '../button';
import {pay, registerParam, payParam, returnNumFetch, focusDom, reloadPage} from '../../../Action/register/registerActions';
import {registe, returnNum} from '../../../Action/register/payAction';

class RegisterCharge extends Component {
    constructor(props) {
        super(props);
    }
    inputChange(val, type){
    }
    inputValChange(val, type){
        let obj;
        this.props.dispatch({
            type: 'EDITE_CHARGE',
            charge: { change: Number(val)-this.props.chargeInfo.cost, cashIn: val }
        });
    }
    selectChange(val,e){
        let arr = this.props.chargeOptions.payWays.filter(item => {
            return item.value === val
        })
        this.props.dispatch({
            type: 'UPDATE_PAYWAY',
            data: {key: arr[0].key, value: arr[0].value}
        });
        this.props.dispatch({
            type: 'EDITE_CHARGE',
            charge: {payTypeName: arr[0].key}
        });
    }
    charge(){
        let {chargeInfo, chargeOptions, patInfo, selectedCard} = this.props;
        if(chargeInfo.cost > chargeInfo.cashIn){
            global.message.error('输入金额不能小于应收金额！');
            return;
        }
        registe(patInfo,chargeOptions,selectedCard,chargeInfo);
    }
    confirmBtn(){
        let {dispatch, chargeInfo, chargeOptions, patInfo, selectedCard, tempDatas} = this.props;
        dispatch({
            type: "EDITE_CHARGE",
            charge: {change: 0}
        });
        returnNum(tempDatas.regId, '退号', chargeInfo, chargeOptions, patInfo)
    }
    cancelBtn(){
        this.props.dispatch({
            type: "HIDE_CHARGE"
        });
        this.props.dispatch({
            type: "HIDE_COVER"
        });
    }
    componentWillMount() {
        let {myStates, dispatch} = this.props;
        if(myStates.isRegisted){
            dispatch({
                type: 'EDITE_CHARGE',
                charge: { change: 0 }
            });
        }
    }
    componentDidMount() {
        let {myStates} = this.props;
        if(!myStates.isRegisted){
            focusDom('chargePayWay', "ant-select-selection")
        }
    }
    render() {
        let {patInfo, chargeInfo, chargeOptions, myStates, dispatch} = this.props;
        let arr1 = [
            {
                title:'姓名',
                isClick: false,
                type: 'input',
                value: patInfo.patientName,
                canEdit: true
            },{
                title:'年龄',
                isClick: false,
                type: 'input',
                value: patInfo.age,
                canEdit: true
            },{
                title:'性别',
                isClick: false,
                type: 'input',
                value: patInfo.sex,
                canEdit: true
            },{
                title:'证件号码',
                isClick: false,
                type: 'input',
                value: patInfo.idNum,
                canEdit: true
            }
        ];
        let arr2 = [
            {
                title:'标准金额',
                isClick: false,
                value: chargeInfo.charge,
                type: 'input',
                canEdit: true
            },{
                title:'优惠金额',
                isClick: false,
                value: chargeInfo.discount,
                type: 'input',
                canEdit: true
            },{
                title:'应收金额',
                isClick: false,
                value: chargeInfo.cost,
                filterType: 'time',
                type: 'input',
                canEdit: true
            },{
                title:'支付方式',
                isClick: false,
                options: chargeOptions.payWays,
                value: chargeOptions.payWay.key,
                filterType: 'payWay',
                id: 'chargePayWay',
                type: 'select'
            },{
                title:'金额',
                id: 'cashIn',
                isClick: false,
                value: chargeInfo.cashIn,
                // defaultVal: chargeInfo.cashIn,
                type: 'input'
            },{
                title:'找零',
                isClick: false,
                type: 'input',
                value: chargeInfo.change,
                canEdit: true
            }
        ];
        if(myStates.isRegisted){
            arr2[3].type = 'input';
            arr2[3].value = '现金';
            arr2.pop();
            arr2.pop();
        }
        let pageName = 'register';
        let forbid = (pageName === 'register');
        return (
            <div id='charge'>
                <div className={style['patInfo']}>
                    {
                        arr1.map((msg, i) =>
                            <InputItem info={msg} cb={this.inputChange.bind(this)}></InputItem>
                        )
                    }
                </div>
                <div className={style['chargeInfo']}>
                    {
                        arr2.map((msg, i) =>{
                            if(msg.type == 'input'){
                                return <InputItem info={msg} cbChange={(msg.id== 'cashIn')?this.inputValChange.bind(this):''}></InputItem>
                            }else if(msg.type == 'select'){
                                return <SelectItem info={msg} cb={this.selectChange.bind(this)}></SelectItem>
                            }
                        })
                    }
                </div>
                {
                    ()=>{
                        if(myStates.isRegisted){
                            return <div className={style['btnWrap1']}>
                                <div className={style['div']}>
                                    <Btn title="确定" src="icon_putonfile.png" cbBtn={this.confirmBtn.bind(this)}></Btn>
                                    <Btn title="取消" src="icon_Register.png" cbBtn={this.cancelBtn.bind(this)}></Btn>
                                    <div className={style['clear']}></div>
                                </div>
                            </div>
                        }else{
                            return <div className={style['btnWrap']}>
                                <div className={style['div']}>
                                    <Btn title="读卡" forbid={forbid} src="icon_card.png" cbBtn={this.inputChange.bind(this)}></Btn>
                                    <Btn title="预结算" forbid={forbid} src="icon_budget.png" cbBtn={this.inputChange.bind(this)}></Btn>
                                    <Btn title="收费" src="icon_Tollpng.png" cbBtn={this.charge.bind(this)}></Btn>
                                    <div className={style['clear']}></div>
                                </div>
                            </div>
                        }
                    }()
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {patInfo, chargeInfo, selectedCard, chargeOptions, myStates, tempDatas} = state;
    return {
        patInfo, chargeInfo, selectedCard, chargeOptions, myStates, tempDatas
    };
}
export default connect(mapStateToProps)(RegisterCharge);
