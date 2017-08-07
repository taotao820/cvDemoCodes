/**
 * Created by tianjiachao on 2017/05/03.
 */

import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import classNames from 'classnames';
import DateCard from './atom/dateCard';
import {setDateCheck, loadDates, fetchCardList} from '../../Action/register/registerActions';
import {CHECK_DATE, SHOW_EDITEFILE, HIDE_EDITEFILE} from '../../Common/js/constants';

class TopTime extends Component {
    constructor(props) {
        super(props);
    }
    checkData(index){
        fetchCardList(this.props.dates.dateList[index].day);
        this.props.dispatch(setDateCheck(index, this.props.dates.dateList));  //2, 调用公共方法，在公共方法里对数据进行处理，然后修改全局数据
    }
    componentWillMount() {
        this.props.dispatch(loadDates());
    }
    render() {
        let {dates} = this.props;
        return (
            <div id='timeWrap' className={style['timeWrap']}>
	            {
	                dates.dateList.map((item, index) =>
	                    <DateCard date={item.date} weekday={item.weekday} checked={dates.checked == index} index={index} parentCheck={this.checkData.bind(this)}></DateCard>
	                )
	            }
	            <div className={style['clear']}></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let {dates} = state;
    return {
        dates
    };
}
export default connect(mapStateToProps)(TopTime);
