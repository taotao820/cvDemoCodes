/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import InputItem from '../../../Common/component/inputItem';
import SelectItem from '../../../Common/component/selectItem';
import MultiSelect from '../../../Common/component/selectItem/multiSelect';
import DateInput from '../../../Common/component/dateInput';
import Btn from '../../../Common/component/button';
import {addFilterItem, clearFilter, codeFiter} from '../../../Action/register/registerActions';
import {getCharge} from '../../../Action/register/payAction';


class FormType extends Component {
    constructor(props) {
        super(props);
    }
    cbSelect(val,type){
        this.props.dispatch(clearFilter(this.props.list, 'left'));
        this.props.dispatch({
            type: 'SET_TYPE',
            currVal: ''
        });
        let filterTemp = Object.assign({}, this.props.list.filters);
        if(type == 'time'){
            filterTemp.filtesRight['type'].currVal  = '';
            filterTemp.filtesRight['dept'].currVal  = '';
            filterTemp.filtesRight['docName'].currVal  = '';
        }else if(type == 'type'){
            filterTemp.filtesRight['dept'].currVal  = '';
            filterTemp.filtesRight['docName'].currVal  = '';
        }else if(type == 'dept'){
            filterTemp.filtesRight['docName'].currVal  = '';
        }
        this.props.dispatch({
            type: "SET_FILTER",
            filters: filterTemp
        });
        let obj = {};
        obj[type] = val;
        this.props.dispatch(addFilterItem(obj, this.props.list));
    }
    cbSelect1(val,type){
        let arr = this.props.info.options.filter(item => {
            return item.value === val
        })
        let types = {
            additionalChargeItems: 'UPDATE_ADD_CHARGE',
            chargeTypes: 'UPDATE_CHARGE_TYPE',
            discountTypes: 'UPDATE_DISCOUNT'
        }
        let obj = (type == 'additionalChargeItems') ? {key: val, value: val} : {key: arr[0].key, value: arr[0].value}
        this.props.dispatch({
            type: types[type],
            data: obj
        });
    }
    editeFile(){
        this.props.dispatch({type: 'SHOW_COVER'});
        this.props.dispatch({type: 'SHOW_EDITFILE'});
    }
    onInputChange(e){
        let {dispatch, list} = this.props;
        dispatch(clearFilter(list));
        dispatch({
            type: 'SET_TYPE',
            currVal: '全部'
        });
        if(!e){
            dispatch({
                type: 'FILTER_REGCODELIST',
                filtedList: list.codeList
            });
        }else{
            codeFiter(e.trim(), list);
        }
    }
    register(){
        let {selectedCard, chargeOptions, patInfo, myStates} = this.props;
        if(selectedCard.length <= 0){
            global.message.warning('请至少选择一个挂号卡');
            return;
        }
        if(myStates.isRegisted){
            global.message.warning('已挂号不能再挂, 退换号请点击已选卡号');
            return;
        }
        if(patInfo.patientId){
            getCharge(chargeOptions, selectedCard, 'regFee')
            this.props.dispatch({
                type: 'SHOW_COVER'
            });
            this.props.dispatch({
                type: 'SHOW_CHARGE'
            });
        }else {
            global.message.warning('获取病人信息失败,请重新提取病人信息')
        }
    }
    changeInvoice(){
        this.props.dispatch({type: 'SHOW_CHANGEINVOICE'});
        this.props.dispatch({type: 'SHOW_COVER'});
    }
    render() {
        let { info, list} = this.props;
        switch (info.type) {
            case 'input':
                return <InputItem info={info} cb={this.onInputChange.bind(this)}></InputItem>;
            case 'dropDown':
                return <SelectItem info={info} cb={this.cbSelect.bind(this)}></SelectItem>;
            case 'select':
                return <SelectItem info={info} cb={this.cbSelect1.bind(this)}></SelectItem>;
            case 'multiselect':
                return <MultiSelect info={info} cb={this.cbSelect1.bind(this)}></MultiSelect>;
            case 'btn':
                return <div className={style['btnWrap']}>
                    <div className={style['div']}>
                        <Btn title="建档" src="icon_putonfile.png" cbBtn={this.editeFile.bind(this)}></Btn>
                        <Btn title="挂号" id="register" src="icon_Register.png" cbBtn={this.register.bind(this)}></Btn>
                        <div className={style['clear']}></div>
                    </div>
                </div>;
            case 'canlender':
                return <DateInput info={info}></DateInput>;
            case 'text':
                return <div className={style['invoiceNo']} onClick={this.changeInvoice.bind(this)}>
                    <span>{`${info.title} : ${info.value}`}</span>
                </div>;
            default:
                return <InputItem info={info}></InputItem>;
        }
    }
}

function mapStateToProps(state) {
    let {selectedCard, chargeOptions, patInfo, myStates} = state;
    return {
        selectedCard, chargeOptions, patInfo, myStates
    };
}
export default connect(mapStateToProps)(FormType);
