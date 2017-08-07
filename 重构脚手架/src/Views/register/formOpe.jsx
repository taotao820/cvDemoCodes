/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import style1 from "../../Common/css/common.scss";
import classNames from 'classnames';
// import PationtInfo from './atom/pationtInfo';
// import Filter from './atom/filter';
// import Operate from './atom/operate';
import InputItem from '../../Common/component/inputItem';
import SelectItem from '../../Common/component/selectItem';
import FormType from './atom/formType';
import Item from './atom/cardItem';
import {updateSelectedCard, fetchChargeOptions, fetchInvoice, getSelectOptions} from '../../Action/register/registerActions';

class FormOpe extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        fetchInvoice();
        fetchChargeOptions();
    }
    clickItem(code,index){
        this.props.dispatch(updateSelectedCard(index, this.props.selectedCard))
        // this.props.dispatch(addFilterItem({docName: '司徒正美', type: ''}, this.props.regCodeList));
    }
    showHideChangeNumPop(){
        this.props.dispatch({
            type: 'SHOW_CHANGE'
        })
    }
    render() {
        let {myStates, chargeOptions, deptOption, timeOption, typeOption, docNameOption, regCodeList, patInfo, date, invoice, selectedCard} = this.props;
        let arr1 = [
            {
                title:'病人标识',
                isClick: false,
                value: patInfo.patientId || '',
                type: 'input',
                canEdit: true
            },{
                title:'姓名',
                isClick: false,
                type: 'input',
                value: patInfo.patientName  || '',
                canEdit: true
            },{
                title:'性别',
                isClick: false,
                type: 'input',
                value: patInfo.sex  || '',
                canEdit: true
            },{
                title:'年龄',
                isClick: false,
                type: 'input',
                value: patInfo.age  || '',
                canEdit: true
            },{
                title:'证件类型',
                isClick: false,
                type: 'input',
                value: patInfo.idType  || '',
                canEdit: true
            },{
                title:'证件号码',
                isClick: false,
                type: 'input',
                value: patInfo.idNum  || '',
                canEdit: true
            }
        ];
        let arr2 = [
            {
                title:'预约日期',
                allowTime: {start: new Date(), end: ''},
                value: date,
                type: 'canlender'
            }, {
                title:'时段',
                options: timeOption.list,
                value: timeOption.currVal,
                filterType: 'time',
                id: 'time',
                type: 'dropDown'
            },{
                title:'号类',
                // options: typeOption.list,
                options: getSelectOptions({time: timeOption.currVal}, regCodeList, 'type'),
                value: typeOption.currVal,
                filterType: 'type',
                id: 'type',
                type: 'dropDown'
            },{
                title:'科室',
                // options: deptOption.list,
                options: getSelectOptions({time: timeOption.currVal,type: typeOption.currVal}, regCodeList, 'dept'),
                value: deptOption.currVal,
                filterType: 'dept',
                id: 'dept',
                type: 'dropDown'
            },{
                title:'医生',
                // options: docNameOption.list,
                options: getSelectOptions({time: timeOption.currVal,type: typeOption.currVal, dept:deptOption.currVal}, regCodeList, 'docName'),
                value: docNameOption.currVal,
                filterType: 'docName',
                id: 'docName',
                type: 'dropDown'
            },{
                title:'号别',
                id: 'codeNum',
                type: 'input'
            }
        ];
        let arr3 = [
            {
                title:'费用类别',
                type: 'select',
                options: chargeOptions.chargeTypes,
                value: chargeOptions.chargeType.value,
                id: 'chargeOptions',
                filterType: 'chargeTypes'
            },{
                title:'优惠类别',
                type: 'select',
                id: 'discountTypes',
                options: chargeOptions.discountTypes,
                value: chargeOptions.discount.value,
                filterType: 'discountTypes'
            },{
                title:'附加项目',
                type: 'multiselect',
                options: chargeOptions.additionalChargeItems,
                value: chargeOptions.additionalCharge.value,
                filterType: 'additionalChargeItems',
                id: 'additionalChargeItems',
                multiple: true,
                size: 'large'
            },{
                title:'',
                isClick: false,
                type: 'btn'
            }
        ]
        let arr4 = [
            {
                title:'当前票号',
                value: invoice.currentInvoiceNo,
                type: 'text'
            },{
                title:'当前票区',
                isClick: false,
                value: invoice.currentInvoiceNoRange,
                type: 'input',
                canEdit: true,
                size: 'large'
            },{
                title:'今日已用',
                isClick: false,
                value: invoice.usedInvoiceNum,
                type: 'input',
                canEdit: true
            },{
                title:'今日作废',
                isClick: false,
                value: invoice.canceledInvoiceNum,
                type: 'input',
                canEdit: true
            },{
                title:'今日挂号',
                isClick: false,
                value: invoice.usedInvoiceNum + invoice.canceledInvoiceNum,
                type: 'input',
                canEdit: true
            }
        ]
        return (
            <div className={style['formOpe']}>
                {
                    [arr1,arr2,arr3,arr4].map((item, i) =>
                        <div id={`form${i}`}>
                            {
                                item.map((msg, i) =>
                                    <FormType info={msg} list={regCodeList}></FormType>
                                )
                            }
                            <div id={style['clear']} className={style['clear']}></div>
                        </div>
                    )
                }
                <div>
                    {
                        selectedCard.map((item, i) =>
                            <div className={style['selectedCard']} id="selectedCard">
                                <Item dept={item.dept}
                                    name={item.docName}
                                    type={item.type}
                                    time={item.time}
                                    index={i}
                                    changeNum = {myStates.isRegisted}
                                    cb={this.clickItem.bind(this)}
                                    cbShow={this.showHideChangeNumPop.bind(this)}>
                                </Item>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {regCodeList, patInfo, dates, invoice, selectedCard, chargeOptions, myStates} = state;
    let rfr = regCodeList.filters.filtesRight
    let deptOption = rfr.dept;
    let timeOption = rfr.time;
    let typeOption = rfr.type;
    let docNameOption = rfr.docName;
    let date = new Date(dates.checkedDate);
    return {
        myStates,chargeOptions, deptOption, timeOption, typeOption, docNameOption, regCodeList, patInfo, date, invoice, selectedCard
    };
}
export default connect(mapStateToProps)(FormOpe);
