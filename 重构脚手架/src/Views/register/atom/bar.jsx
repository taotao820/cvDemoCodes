/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router";
import style from "./style";
import classNames from 'classnames';
import SelectItem from '../../../Common/component/selectItem';
import RadioInput from '../../../Common/component/radio';
import {addFilterItem, clearFilter} from '../../../Action/register/registerActions';

class Bar extends Component {
    constructor(props) {
        super(props);
    }
    selectValue(val){
        this.props.dispatch(clearFilter(this.props.regCodeList, 'right'));
        // val = (val == '全部') ? '' : val;
        this.props.dispatch(addFilterItem({dept: val}, this.props.regCodeList, true));
    }
    selectValue1(val){
        this.props.dispatch(clearFilter(this.props.regCodeList, 'right'));
        this.props.dispatch({
            type: 'SET_TYPE',
            currVal: val
        });
        val = (val == '全部') ? '' : val;
        this.props.dispatch(addFilterItem({type: val}, this.props.regCodeList, true));
    }
    // radioCheck(val){
    //     this.props.dispatch(clearFilter(this.props.regCodeList, 'right'));
    //     this.props.dispatch({
    //         type: 'SET_TYPE',
    //         currVal: val
    //     });
    //     val = (val == '全部') ? '' : val;
    //     this.props.dispatch(addFilterItem({type: val}, this.props.regCodeList, true));
    // }
    render() {
        let {deptFilter, regCodeList, checkType} = this.props;
        if(deptFilter.list[0] && deptFilter.list[0].key !== '全部'){
            deptFilter.list.unshift({
                key: '全部',
                value: '全部'
            })
        }
        let info = {
            options: deptFilter.list,
            title: '科室列表',
            id: 'deptLeft',
            value: deptFilter.currVal
        }
        let info1 = {
            options: checkType.list,
            title: '号类',
            id: 'typeLeft',
            value: checkType.currVal
        }
        return (
            <div className={style['bar']}>
            <div className={style['bar-type']}>
                    <SelectItem info={info1} cb={this.selectValue1.bind(this)}></SelectItem>
                </div>
                <div className={style['bar-dept']}>
                    <SelectItem info={info} cb={this.selectValue.bind(this)}></SelectItem>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {regCodeList, checkType} = state;
    let deptFilter = regCodeList.filters.filtesLeft.dept;
    return {
        deptFilter,
        regCodeList,
        checkType
    };
}
export default connect(mapStateToProps)(Bar);
