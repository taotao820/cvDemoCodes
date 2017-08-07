/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import InputItem from '../../../Common/component/inputItem';
import SelectItem from '../../../Common/component/selectItem';
import DateInput from '../../../Common/component/dateInput';
import Btn from '../../../Common/component/button';
import {addFilterItem, clearFilter, codeFiter, getSelectOptions, fetchCardList} from '../../../Action/register/registerActions';
import {changeNum} from '../../../Action/register/payAction';

class ChangeNum extends Component {
    constructor(props) {
        super(props);
    }
    cbSelect(val,type){
        let obj = {};
        obj[type] = val;
        let filterTemp = Object.assign({}, this.props.regCodeList.filters);
        if(type == 'time'){
            filterTemp.filtesRight['dept'].currVal  = '';
            filterTemp.filtesRight['docName'].currVal  = ''
        }else if(type == 'dept'){
            filterTemp.filtesRight['docName'].currVal  = ''
        }
        this.props.dispatch({
            type: "SET_FILTER",
            filters: filterTemp
        });
        this.props.dispatch(addFilterItem(obj, this.props.regCodeList));
    }
    confirmBtn(){
        let {regCodeList, tempDatas, selectedCard, patInfo, chargeOptions} = this.props;
        let length = regCodeList.filtedList.length;
        if(length == 0){
            global.message.warning('没有符合条件的号卡');
            return;
        }else if(length > 1){
            global.message.warning('符合条件的号卡有多个，无法换号');
            return;
        }else{
            if(tempDatas.id == selectedCard[0].id){
            // if(tempDatas.code == selectedCard[0].code && global.dateFormat(tempDatas.date,'YY-MM-DD') == global.dateFormat(selectedCard[0].scheduleDate,'YY-MM-DD')){
                global.message.warning('所选号与原号一样，请换号');
                return;
            }
            changeNum(tempDatas.regId, selectedCard, patInfo, chargeOptions);
        }
    }
    cancelBtn(){
        let dispatch = this.props.dispatch;
        dispatch({type: 'HIDE_COVER'});
        dispatch({type: 'SHOW_CHANGE'});
        fetchCardList(new Date());
    }
    componentWillMount() {
        this.props.dispatch(addFilterItem({type: this.props.selectedCard[0].type}, this.props.regCodeList));
    }
    render() {
        let {chargeOptions, deptOption, timeOption, typeOption, docNameOption, regCodeList, patInfo, date, selectedCard} = this.props;
        let arr = [
            {
                title:'预约日期',
                isClick: false,
                value: date,
                allowTime: {start: new Date(), end: ''},
                type: 'canlender'
            },{
                title:'时段',
                isClick: false,
                options: getSelectOptions({type: selectedCard[0].type}, regCodeList, 'time'),
                id: 'changeTime',
                value: timeOption.currVal,
                filterType: 'time',
                type: 'dropDown'
            },{
                title:'科室',
                isClick: false,
                // options: deptOption.list,
                options: getSelectOptions({time: timeOption.currVal,type: selectedCard[0].type}, regCodeList, 'dept'),
                value: deptOption.currVal,
                filterType: 'dept',
                id: 'changeDept',
                type: 'dropDown'
            },{
                title:'医生',
                isClick: false,
                // options: docNameOption.list,
                options: getSelectOptions({time: timeOption.currVal,type: selectedCard[0].type,dept:deptOption.currVal}, regCodeList, 'docName'),
                value: docNameOption.currVal,
                filterType: 'docName',
                id: 'changeDocName',
                type: 'dropDown'
            }
        ];
        return (
            <div className={style['changeNum']}>
                <div className={style['wrap']}>
                    <SelectItem info={arr[1]} cb={this.cbSelect.bind(this)}></SelectItem>
                    <SelectItem info={arr[2]} cb={this.cbSelect.bind(this)}></SelectItem>
                    <SelectItem info={arr[3]} cb={this.cbSelect.bind(this)}></SelectItem>
                    <DateInput info={arr[0]}></DateInput>
                    <div className={style['btnWrap']}>
                        <div className={style['div']}>
                            <Btn title="确定" src="icon_putonfile.png" cbBtn={this.confirmBtn.bind(this)}></Btn>
                            <Btn title="取消" src="icon_Register.png" cbBtn={this.cancelBtn.bind(this)}></Btn>
                            <div className={style['clear']}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {regCodeList, patInfo, dates, selectedCard, chargeOptions, tempDatas} = state;
    let rfr = regCodeList.filters.filtesRight
    let deptOption = rfr.dept;
    let timeOption = rfr.time;
    let typeOption = rfr.type;
    let docNameOption = rfr.docName;
    let date = new Date(dates.checkedDate);
    return {
        tempDatas, chargeOptions, deptOption, timeOption, typeOption, docNameOption, regCodeList, patInfo, date, selectedCard
    };
}
export default connect(mapStateToProps)(ChangeNum);
