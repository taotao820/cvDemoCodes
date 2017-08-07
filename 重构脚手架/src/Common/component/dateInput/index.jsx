/**
 * Created by tianjiachao on 2017/05/10.
 */
import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import style from "./style";
import style2 from "antd/lib/date-picker/style/css";
import classNames from 'classnames';
import DatePicker from 'antd/lib/date-picker';
import {fetchCardList} from '../../../Action/register/registerActions';

class InputItem extends Component {
    dateChange(val){
        if(val){
            this.props.dispatch({
                type: 'CHECK_DATE',
                checked: 0,
                checkedDate: val
            })
            fetchCardList(val);
        }
    }
    dateChange1(val){
        this.props.cb(val, this.props.info.title)
    }
    disabledDate (current) {
        if(this.props.info.allowTime && this.props.info.allowTime.start){
            return current && (current.getTime() < global.getDayTime0(new Date(this.props.info.allowTime.start)));
        }else{
            return false
        }
    };
    render() {
        let { info, placeHolder, titleStyle, inputStyle, wrapStyle, cb} = this.props;
        return (
            <div id="date" className={style['date']}>
                <span className={style['date-span']} style={titleStyle}>{info.title}:</span>
                <div className={style['dateWrap']}>
                    <DatePicker value= {info.value} disabledDate={this.disabledDate.bind(this)} onChange={(cb)?this.dateChange1.bind(this):this.dateChange.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default connect()(InputItem);